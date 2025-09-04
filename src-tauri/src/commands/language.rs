use tauri::command;

use crate::constants::OS_LANGUAGE;

#[command]
pub fn get_os_language() -> String {
    OS_LANGUAGE.clone()
}
