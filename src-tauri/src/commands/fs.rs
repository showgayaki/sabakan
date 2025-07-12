use tauri::command;

use crate::utils::fs;

#[command]
pub fn directory_exists(path: &str) -> bool {
    fs::directory_exists(path)
}
