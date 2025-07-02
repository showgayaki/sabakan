use log::{debug, error, info};

mod constants;
mod utils;

use constants::{HOST_ARCH, HOST_OS};
use utils::logger::init_logger;

pub fn run() {
    init_logger(); // ロガーの初期化
    info!("Application started on {}({}).", HOST_OS, HOST_ARCH);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        // .invoke_handler()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
