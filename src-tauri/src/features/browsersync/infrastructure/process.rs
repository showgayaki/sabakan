use log::{error, info};
use std::io::{BufRead, BufReader};
use std::process::{Child, Command};
use std::time::Duration;
use tauri::{Emitter, Window};

pub fn spawn_browsersync(window: &Window, mut command: Command) -> Result<(Child, String), String> {
    info!("spawn browsersync called.");

    let mut child = command.spawn().map_err(|e| {
        error!("Failed to start browser-sync: {e}");
        format!("Failed to start browser-sync: {e}")
    })?;

    // バックグラウンドスレッドから行を送信するためのチャンネルを作成
    let (tx, rx) = std::sync::mpsc::channel::<String>();

    if let Some(stdout) = child.stdout.take() {
        let window_clone = window.clone();
        let tx_clone = tx.clone();
        std::thread::spawn(move || {
            let reader = BufReader::new(stdout);
            for line_result in reader.lines() {
                match line_result {
                    Ok(line) => {
                        info!("[Browsersync:stdout] {line}");
                        let _ = window_clone.emit("browsersync_log", &line);
                        let _ = tx_clone.send(line);
                    }
                    Err(e) => {
                        error!("[Browsersync:stdout] Error reading line: {e}");
                        break;
                    }
                }
            }
        });
    } else {
        error!("Failed to capture stdout from browser-sync");
    }

    if let Some(stderr) = child.stderr.take() {
        let window_clone = window.clone();
        let tx_clone = tx.clone();
        std::thread::spawn(move || {
            let reader = BufReader::new(stderr);
            for line_result in reader.lines() {
                match line_result {
                    Ok(line) => {
                        info!("[Browsersync:stderr] {line}");
                        let _ = window_clone.emit("browsersync_log", &line);
                        let _ = tx_clone.send(line);
                    }
                    Err(e) => {
                        error!("[Browsersync:stderr] Error reading line: {e}");
                        break;
                    }
                }
            }
        });
    } else {
        error!("Failed to capture stderr from browser-sync");
    }

    // External URL が現れるのを待つ（チャンネルからブロッキングで読み取る）
    let timeout = Duration::from_secs(10); // timeout: 10秒
    let mut external_url = None;

    loop {
        let window_clone = window.clone();
        match rx.recv_timeout(timeout) {
            Ok(line) => {
                if line.contains("External:") {
                    if let Some(url) = line.split("External:").nth(1) {
                        external_url = Some(url.trim().to_string());
                        break;
                    }
                }
            }
            Err(std::sync::mpsc::RecvTimeoutError::Timeout) => {
                let error = "Timed out waiting for External URL from Browsersync";
                let _ = window_clone.emit("browsersync_log", error);
                error!("{error}");
                break;
            }
            Err(e) => {
                error!("Error receiving from Browsersync output: {e}");
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
