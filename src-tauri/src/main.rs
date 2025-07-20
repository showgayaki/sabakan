// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::env;

use sabakan_lib::{init_logger, NODE_DIR};

fn main() {
    init_logger(); // ロガーの初期化

    let current_path = env::var("PATH").unwrap_or_default();

    let new_path = if cfg!(windows) {
        format!("{};{}", NODE_DIR.display(), current_path)
    } else {
        let node_bin_dir = NODE_DIR.join("bin");
        format!("{}:{}", node_bin_dir.display(), current_path)
    };
    env::set_var("PATH", new_path);

    sabakan_lib::run()
}
