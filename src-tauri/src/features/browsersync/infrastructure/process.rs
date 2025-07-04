use std::env::var;
use std::process::{Child, Command};

use crate::constants::NODE_DIR;

pub fn spawn_browsersync(target_dir: &str) -> Result<Child, String> {
    let target_files = ["**/*.html", "**/*.css", "**/*.js", "**/*.php"];

    let npm_bin = NODE_DIR.join("bin/npm");
    let node_bin_dir = NODE_DIR.join("bin");

    // PATHに追加しておかないと、グローバルのnodeを使われちゃう
    let path_var = var("PATH").unwrap_or_default();
    let patched_path = format!("{}:{}", node_bin_dir.display(), path_var);

    // npm exec browser-sync -- start --cwd {target_dir} --server --files {target_files.join(",")}
    Command::new(npm_bin)
        .env("PATH", patched_path)
        .arg("exec")
        .arg("browser-sync")
        .arg("--")
        .arg("start")
        .arg("--cwd")
        .arg(target_dir)
        .arg("--server")
        .current_dir(target_dir)
        .arg("--files")
        .arg(target_files.join(","))
        .spawn()
        .map_err(|e| format!("Failed to start browser-sync: {}", e))
}

pub fn stop_browsersync(process: &mut Child) -> Result<(), String> {
    process
        .kill()
        .map_err(|e| format!("Failed to stop process: {}", e))
}
