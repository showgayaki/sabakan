use log::info;
use std::process::Command;
use tokio::task::spawn_blocking;

use crate::constants::NODE_DIR;

pub async fn install() -> Result<(), String> {
    return spawn_blocking(install_browsersync)
        .await
        .map_err(|e| format!("Task failed: {:?}", e))?;
}

fn install_browsersync() -> Result<(), String> {
    const BROWSERSYNC_VER: &str = "3.0.4";

    let npm_bin = NODE_DIR.join("bin/npm");
    info!("Installing Browsersync using {:?}", npm_bin);

    let mut child = Command::new(npm_bin)
        .current_dir(&*NODE_DIR)
        .arg("install")
        .arg(format!("browser-sync@{}", BROWSERSYNC_VER))
        .spawn()
        .map_err(|e| format!("Failed to start npm: {}", e))?;

    info!("Waiting for Browsersync installation to complete...");

    let status = child
        .wait()
        .map_err(|e| format!("Failed to wait for Browsersync installation: {}", e))?;

    if !status.success() {
        return Err("Failed to install Browsersync".to_string());
    }

    info!("Browsersync installed successfully.");

    Ok(())
}
