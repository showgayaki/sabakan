use log::{error, info};
use std::io::{BufRead, BufReader};
use std::process::{Child, Command};
use tauri::{Emitter, Window};

pub fn spawn_browsersync(window: Window, mut command: Command) -> Result<(Child, String), String> {
    info!("spawn browsersync called.");

    let mut child = command.spawn().map_err(|e| {
        error!("Failed to start browser-sync: {e}");
        format!("Failed to start browser-sync: {e}")
    })?;

    let stdout = child.stdout.take().ok_or({
        error!("Failed to capture stdout from browser-sync");
        "Missing stdout"
    })?;
    let reader = BufReader::new(stdout);

    // バックグラウンドスレッドから行を送信するためのチャンネルを作成
    let (tx, rx) = std::sync::mpsc::channel();

    // stdout を継続的に読み取るためのスレッドを起動
    std::thread::spawn(move || {
        for line_result in reader.lines() {
            match line_result {
                Ok(line) => {
                    info!("[Browsersync] {line}");
                    let _ = window.emit("browsersync_log", &line);
                    let _ = tx.send(line);
                }
                Err(e) => {
                    info!("[Browsersync] Error reading line: {e}");
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
    info!("Stopping Browsersync process with PID: {pid}");

    #[cfg(unix)]
    {
        use nix::sys::signal::{killpg, Signal};
        use nix::unistd::Pid;

        killpg(Pid::from_raw(pid), Signal::SIGKILL)
            .map_err(|e| format!("Failed to kill process group: {}", e))?;
    }

    #[cfg(windows)]
    {
        use std::process::Command;

        let output = Command::new("taskkill")
            .arg("/PID")
            .arg(pid.to_string())
            .arg("/T")
            .arg("/F")
            .output()
            .map_err(|e| format!("Failed to execute taskkill: {e}"))?;

        if !output.status.success() {
            return Err(format!(
                "taskkill failed: {}",
                String::from_utf8_lossy(&output.stderr)
            ));
        }
    }

    process
        .wait()
        .map_err(|e| format!("Failed to wait for process: {e}"))?;

    Ok(true)
}
