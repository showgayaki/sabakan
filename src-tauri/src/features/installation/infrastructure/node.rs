use tokio::task::spawn_blocking;

use crate::constants::{HOST_ARCH, HOST_OS};

use super::super::infrastructure::install_binary;

pub async fn install() -> Result<(), String> {
    let binary_name = "Node.js";
    let url = download_url()?;

    return spawn_blocking(move || install_binary(binary_name.to_string(), url))
        .await
        .map_err(|e| format!("Task failed: {e}"))?
        .await;
}

fn download_url() -> Result<String, String> {
    const NODE_VER: &str = "v22.14.0";
    let (os, arch, ext) = match (HOST_OS, HOST_ARCH) {
        ("windows", "x86_64") => ("win", "x64", "zip"),
        ("macos", "x86_64") => ("darwin", "x64", "tar.gz"),
        ("macos", "aarch64") => ("darwin", "arm64", "tar.gz"),
        _ => return Err("Unsupported platform".to_string()),
    };

    Ok(format!(
        "https://nodejs.org/dist/{NODE_VER}/node-{NODE_VER}-{os}-{arch}.{ext}"
    ))
}
