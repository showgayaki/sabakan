use log::{error, info};
use std::fs;

use crate::constants::BINARY_DIR;

use super::constants::NODE_DIR;
use super::infrastructure::{browsersync, node};

pub fn check_installed_binaries() -> Vec<String> {
    // バイナリ用ディレクトリのチェック
    if !BINARY_DIR.exists() {
        if let Err(e) = fs::create_dir_all(&*BINARY_DIR) {
            error!("Failed to create binaries dir: {}", e);
            std::process::exit(1);
        }
        info!("Created binaries directory at {:?}", BINARY_DIR);
    }

    let mut installed = Vec::new();

    if NODE_DIR.join("bin/node").exists() {
        info!("Node.js is already installed");
        installed.push("Node.js".to_string());
    } else {
        info!("Node.js is NOT installed");
    }

    if NODE_DIR.join("node_modules/browser-sync").is_dir() {
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
