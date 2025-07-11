use log::{error, info};
use std::fs;

use crate::constants::{BINARY_DIR, NODE_DIR};

use super::infrastructure::{browsersync, node};

pub fn check_installed_binaries() -> Vec<String> {
    // バイナリ用ディレクトリのチェック
    if !BINARY_DIR.exists() {
        if let Err(e) = fs::create_dir_all(&*BINARY_DIR) {
            error!("Failed to create binaries dir: {e}");
            std::process::exit(1);
        }
        info!("Created binaries directory at {:?}", *BINARY_DIR);
    }

    let mut installed = Vec::new();

    #[cfg(unix)]
    let node_bin = NODE_DIR.join("bin").join("node");
    #[cfg(windows)]
    let node_bin = NODE_DIR.join("node.exe");

    if node_bin.exists() {
        info!("Node.js is already installed");
        installed.push("Node.js".to_string());
    } else {
        info!("Node.js is NOT installed");
    }

    if NODE_DIR.join("node_modules").join("browser-sync").is_dir() {
        info!("Browsersync is already installed");
        installed.push("Browsersync".to_string());
    } else {
        info!("Browsersync is NOT installed");
    }

    installed
}

pub async fn install_nodejs() -> Result<(), String> {
    node::install().await
}

pub async fn install_browsersync() -> Result<(), String> {
    browsersync::install().await
}
