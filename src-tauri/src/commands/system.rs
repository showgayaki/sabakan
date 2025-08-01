use tauri::command;

use crate::constants::HOST_OS;

#[command]
pub fn get_host_os() -> String {
    HOST_OS.to_string()
}
