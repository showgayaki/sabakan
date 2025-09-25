use log::info;
use std::process::{Command, Stdio};
use tauri::{Emitter, Window};

use crate::constants::BROWSERSYNC_PATH;
use crate::types::browsersync::BrowsersyncParams;

pub fn browsersync_command(window: &Window, params: &BrowsersyncParams) -> Result<Command, String> {
    // Browsersync options
    // https://browsersync.io/docs/options
    // Browsersync Command Line Usage
    // https://browsersync.io/docs/command-line

    // Command Ex:
    // browser-sync start --server --files "**/*.html, **/*.css, **/*.js"
    // browser-sync start --proxy http://localhost:8888/hoge --files "**/*.html, **/*.css, **/*.js"

    let target_files: Vec<String> = if params.extensions.is_empty() {
        // 何も選択されていないときは、すべてのファイルが対象
        vec!["**/*.*".to_string()]
    } else {
        params
            .extensions
            .iter()
            .map(|ext| format!("**/*{ext}"))
            .collect()
    };

    let merged_params = BrowsersyncParams {
        extensions: target_files.clone(),
        ..(*params).clone() // 残りは params からコピー
    };

    info!("BrowsersyncParams: {merged_params:?}");

    #[cfg(windows)]
    let command = windows_command(&merged_params)?;
    #[cfg(unix)]
    let command = macos_command(&merged_params)?;

    info!("Executing: {command:?}");
    let pretty = format!("[INFO] {}", merged_params.pretty_print());
    let _ = window.emit("browsersync_log", &pretty);

    Ok(command)
}

fn build_base_command(params: &BrowsersyncParams) -> Command {
    let BrowsersyncParams {
        target_dir,
        proxy_url,
        extensions,
        ghost_mode,
    } = params;

    let mut command = Command::new(&*BROWSERSYNC_PATH);
    command.current_dir(target_dir).arg("start");

    if proxy_url.trim().is_empty() {
        command.arg("--server");
    } else {
        command.arg("--proxy").arg(proxy_url);
    }

    // GhostMode
    for (key, enabled) in ghost_mode.as_map() {
        if !enabled {
            command.arg(format!("--no-ghost-mode.{key}"));
        }
    }

    command
        .arg("--files")
        .arg(extensions.join(","))
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());

    command
}

#[cfg(windows)]
fn windows_command(params: &BrowsersyncParams) -> Result<Command, String> {
    use std::os::windows::process::CommandExt;
    use winapi::um::winbase::CREATE_NEW_PROCESS_GROUP;

    let mut command = build_base_command(params);
    // 0x08000000: コンソールを表示させない
    command.creation_flags(CREATE_NEW_PROCESS_GROUP | 0x08000000);

    Ok(command)
}

#[cfg(unix)]
fn macos_command(params: &BrowsersyncParams) -> Result<Command, String> {
    use std::os::unix::process::CommandExt;
    let mut command = build_base_command(params);

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
