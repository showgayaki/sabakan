use log::{error, info};
use std::process::Command;
use tokio::task::spawn_blocking;

use crate::constants::NODE_DIR;

pub async fn install() -> Result<(), String> {
    return spawn_blocking(install_browsersync).await.map_err(|e| {
        let error = format!("Task failed: {e}");
        error!("{error}");
        error
    })?;
}

fn install_browsersync() -> Result<(), String> {
    const BROWSERSYNC_VER: &str = "3.0.4";

    #[cfg(unix)]
    let npm_bin = NODE_DIR.join("bin").join("npm");
    #[cfg(windows)]
    let npm_bin = NODE_DIR.join("npm.cmd");

    info!("Installing Browsersync using {}", npm_bin.display());

    let mut cmd = Command::new(npm_bin);

    #[cfg(windows)]
    {
        use std::os::windows::process::CommandExt;
        cmd.creation_flags(0x08000000); // CREATE_NO_WINDOW
    }

    let mut child = cmd
        .current_dir(&*NODE_DIR)
        .arg("install")
        .arg(format!("browser-sync@{BROWSERSYNC_VER}"))
        .spawn()
        .map_err(|e| {
            let error = format!("Failed to start npm: {e}");
            error!("{error}");
            error
        })?;

    info!("Waiting for Browsersync installation to complete...");

    let status = child.wait().map_err(|e| {
        let error = format!("Failed to wait for Browsersync installation: {e}");
        error!("{error}");
        error
    })?;

    if !status.success() {
        error!("Browsersync installation failed with status: {status}");
        return Err("Failed to install Browsersync".to_string());
    }

    info!("Browsersync installed successfully.");

    Ok(())
}
