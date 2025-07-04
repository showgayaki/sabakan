use log::debug;
use nix::sys::signal::{killpg, Signal};
use nix::unistd::Pid;
use std::env::var;
use std::os::unix::process::CommandExt;
use std::process::{Child, Command};

use crate::constants::NODE_DIR;

pub fn spawn_browsersync(target_dir: &str) -> Result<Child, String> {
    let target_files = ["**/*.html", "**/*.css", "**/*.js", "**/*.php"];

    let npm_bin = NODE_DIR.join("bin/npm");
    let node_bin_dir = NODE_DIR.join("bin");

    // PATHに追加しておかないと、グローバルのnodeを使われちゃう
    let path_var = var("PATH").unwrap_or_default();
    let patched_path = format!("{}:{}", node_bin_dir.display(), path_var);

    // npm exec browser-sync -- start --cwd {target_dir} --server --files {target_files.join(",")}
    // SAFETY:
    // - CommandExt::pre_exec() は unsafe であり、spawn 前のプロセス空間で実行されるため、
    //   使用には明示的な unsafe ブロックが必要。
    // - pre_exec 内では libc::setpgid(0, 0) を使って現在のプロセスを独立したプロセスグループに設定している。
    // - setpgid(0, 0) は POSIX 標準の安全なシステムコールで、メモリやスレッド状態を変更しない。
    // - 他の共有リソース（mutex等）やメモリ操作を行っていないため、pre_exec 内でも安全に使える。
    // - これにより、後から killpg() を使って browser-sync プロセスごと安全に停止できるようにしている。
    unsafe {
        Command::new(npm_bin)
            .env("PATH", patched_path)
            .arg("exec")
            .arg("browser-sync")
            .arg("--")
            .arg("start")
            .arg("--cwd")
            .arg(target_dir)
            .arg("--server")
            .current_dir(target_dir)
            .arg("--files")
            .arg(target_files.join(","))
            .pre_exec(|| {
                // グループリーダーとしてプロセスグループを作る
                libc::setpgid(0, 0);
                Ok(())
            })
            .spawn()
    }
    .map_err(|e| format!("Failed to start browser-sync: {}", e))
}

pub fn stop_browsersync(process: &mut Child) -> Result<(), String> {
    let pid = process.id() as i32;
    debug!("Stopping Browsersync process with PID: {}", pid);
    killpg(Pid::from_raw(pid), Signal::SIGKILL)
        .map_err(|e| format!("Failed to kill process group: {}", e))?;

    process
        .wait()
        .map_err(|e| format!("Failed to wait for process: {}", e))?;

    Ok(())
}
