use log::info;
use nix::sys::signal::{killpg, Signal};
use nix::unistd::Pid;
use std::io::{BufRead, BufReader};
use std::os::unix::process::CommandExt;
use std::process::{Child, Command, Stdio};
use tauri::{Emitter, Window};

use crate::constants::NODE_DIR;

pub fn spawn_browsersync(
    window: Window,
    target_dir: &str,
    proxy_url: &str,
) -> Result<(Child, String), String> {
    let target_files = ["**/*.html", "**/*.css", "**/*.js", "**/*.php"];

    let npm_bin = NODE_DIR.join("bin/npm");
    let node_bin_dir = NODE_DIR.join("bin");

    // PATHに追加しておかないと、グローバルのnodeを使われちゃう
    let path_var = std::env::var("PATH").unwrap_or_default();
    let patched_path = format!("{}:{}", node_bin_dir.display(), path_var);

    // Command Ex:
    // npm exec browser-sync -- start --server --files "**/*.html, **/*.css, **/*.js"
    // npm exec browser-sync -- start --proxy http://localhost:8888/hoge --files "**/*.html, **/*.css, **/*.js"

    // SAFETY:
    // - CommandExt::pre_exec() は unsafe であり、spawn 前のプロセス空間で実行されるため、
    //   使用には明示的な unsafe ブロックが必要。
    // - pre_exec 内では libc::setpgid(0, 0) を使って現在のプロセスを独立したプロセスグループに設定している。
    // - setpgid(0, 0) は POSIX 標準の安全なシステムコールで、メモリやスレッド状態を変更しない。
    // - 他の共有リソース（mutex等）やメモリ操作を行っていないため、pre_exec 内でも安全に使える。
    // - これにより、後から killpg() を使って browser-sync プロセスごと安全に停止できるようにしている。
    let mut command = Command::new(npm_bin);
    command
        .env("PATH", patched_path)
        .arg("exec")
        .arg("browser-sync")
        .arg("--")
        .arg("start");

    if proxy_url.trim().is_empty() {
        command.arg("--server");
    } else {
        command.arg("--proxy").arg(proxy_url);
    }

    unsafe {
        command
            .current_dir(target_dir)
            .arg("--files")
            .arg(target_files.join(","))
            .stdout(Stdio::piped())
            .stderr(Stdio::null())
            .pre_exec(|| {
                libc::setpgid(0, 0);
                Ok(())
            });
    }

    let mut child = command
        .spawn()
        .map_err(|e| format!("Failed to start browser-sync: {}", e))?;

    let stdout = child.stdout.take().ok_or("Missing stdout")?;
    let reader = BufReader::new(stdout);

    // バックグラウンドスレッドから行を送信するためのチャンネルを作成
    let (tx, rx) = std::sync::mpsc::channel();

    // stdout を継続的に読み取るためのスレッドを起動
    std::thread::spawn(move || {
        for line_result in reader.lines() {
            match line_result {
                Ok(line) => {
                    info!("[BrowserSync] {}", line);
                    let _ = window.emit("browsersync_log", &line);
                    let _ = tx.send(line);
                }
                Err(e) => {
                    info!("[BrowserSync] Error reading line: {}", e);
                    break;
                }
            }
        }
    });

    let mut external_url = None;

    // External URL が現れるのを待つ（チャンネルからブロッキングで読み取る）
    for line in rx {
        if line.contains("External:") {
            if let Some(url) = line.split("External:").nth(1) {
                external_url = Some(url.trim().to_string());
                break;
            }
        }
    }

    info!(
        "Browsersync External URL: {}",
        external_url.as_deref().unwrap_or("(not set)")
    );

    match external_url {
        Some(url) => Ok((child, url)),
        None => Err("External URL not found".into()),
    }
}

pub fn stop_browsersync(process: &mut Child) -> Result<bool, String> {
    let pid = process.id() as i32;
    info!("Stopping Browsersync process with PID: {}", pid);

    killpg(Pid::from_raw(pid), Signal::SIGKILL)
        .map_err(|e| format!("Failed to kill process group: {}", e))?;

    process
        .wait()
        .map_err(|e| format!("Failed to wait for process: {}", e))?;

    Ok(true)
}
