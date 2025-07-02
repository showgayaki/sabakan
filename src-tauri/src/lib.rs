use log::info;

mod constants;
mod features;
mod utils;

use constants::{HOST_ARCH, HOST_OS};
use utils::logger::init_logger;

use features::installation::commands::{
    check_installed_binaries, install_browsersync, install_nodejs,
};

pub fn run() {
    init_logger(); // ロガーの初期化
    info!("Application started on {}({}).", HOST_OS, HOST_ARCH);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            check_installed_binaries,
            install_browsersync,
            install_nodejs,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
