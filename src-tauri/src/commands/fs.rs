use tauri::command;

#[command]
pub fn directory_exists(path: &str) -> bool {
    std::path::Path::new(path).is_dir()
}
