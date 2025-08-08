use log::info;
use std::process::{Command, Stdio};

use crate::constants::BROWSERSYNC_PATH;

pub fn browsersync_command(target_dir: &str, proxy_url: &str) -> Result<Command, String> {
    // Command Ex:
    // browser-sync start --server --files "**/*.html, **/*.css, **/*.js"
    // browser-sync start --proxy http://localhost:8888/hoge --files "**/*.html, **/*.css, **/*.js"

    let target_files = ["**/*.html", "**/*.css", "**/*.js", "**/*.php"];

    #[cfg(windows)]
    let command = windows_command(target_dir, proxy_url, &target_files)?;
    #[cfg(unix)]
    let command = macos_command(target_dir, proxy_url, &target_files)?;

    info!("Executing: {command:?}");
    Ok(command)
}

fn build_base_command(target_dir: &str, proxy_url: &str, target_files: &[&str]) -> Command {
    let mut command = Command::new(&*BROWSERSYNC_PATH);
    command.current_dir(target_dir).arg("start");

    if proxy_url.trim().is_empty() {
        command.arg("--server");
    } else {
        command.arg("--proxy").arg(proxy_url);
    }

    command
        .arg("--files")
        .arg(target_files.join(","))
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());

    command
}

#[cfg(windows)]
fn windows_command(
    target_dir: &str,
    proxy_url: &str,
    target_files: &[&str],
) -> Result<Command, String> {
    use std::os::windows::process::CommandExt;
    use winapi::um::winbase::CREATE_NEW_PROCESS_GROUP;

    let mut command = build_base_command(target_dir, proxy_url, target_files);
    // 0x08000000: コンソールを表示させない
    command.creation_flags(CREATE_NEW_PROCESS_GROUP | 0x08000000);

    Ok(command)
}

#[cfg(unix)]
fn macos_command(
    target_dir: &str,
    proxy_url: &str,
    target_files: &[&str],
) -> Result<Command, String> {
    use std::os::unix::process::CommandExt;
    let mut command = build_base_command(target_dir, proxy_url, target_files);

    // SAFETY:
    // - CommandExt::pre_exec() は unsafe であり、spawn 前のプロセス空間で実行されるため、
    //   使用には明示的な unsafe ブロックが必要。
    // - pre_exec 内では libc::setpgid(0, 0) を使って現在のプロセスを独立したプロセスグループに設定している。
    // - setpgid(0, 0) は POSIX 標準の安全なシステムコールで、メモリやスレッド状態を変更しない。
    // - 他の共有リソース（mutex等）やメモリ操作を行っていないため、pre_exec 内でも安全に使える。
    // - これにより、後から killpg() を使って browser-sync プロセスごと安全に停止できるようにしている。
    unsafe {
        command.pre_exec(|| {
            libc::setpgid(0, 0);
            Ok(())
        });
    }

    Ok(command)
}
