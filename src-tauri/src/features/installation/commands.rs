use tauri::command;

use super::services;

#[command]
pub fn check_installed_binaries() -> Vec<String> {
    services::check_installed_binaries()
}
#[command]
pub async fn install_nodejs() -> Result<(), String> {
    services::install_nodejs().await
}
#[command]
pub async fn install_browsersync() -> Result<(), String> {
    services::install_browsersync().await
}
