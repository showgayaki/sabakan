use log::info;

mod constants;
mod features;
mod utils;

use constants::{HOST_ARCH, HOST_OS};
use utils::logger::init_logger;

use features::installation::commands as installation_commands;

pub fn run() {
    init_logger(); // ロガーの初期化
    info!("Application started on {}({}).", HOST_OS, HOST_ARCH);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            installation_commands::check_installed_binaries,
            installation_commands::install_nodejs,
            installation_commands::install_browsersync,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
