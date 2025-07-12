use log::{error, info};
use std::sync::{Arc, Mutex};
use tauri::{Manager, State};

mod commands;
mod constants;
mod features;
mod utils;

use commands::fs::directory_exists;
use commands::system::get_host_os;
use constants::{HOST_ARCH, HOST_OS};
use utils::logger::init_logger;

use features::browsersync::commands::{start_browsersync, stop_browsersync};
use features::browsersync::services::BrowsersyncState;
use features::installation::commands::{
    check_installed_binaries, install_browsersync, install_nodejs,
};

pub fn run() {
    init_logger(); // ロガーの初期化
    info!("Application started on {HOST_OS}({HOST_ARCH})");

    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .manage(BrowsersyncState {
            process: Arc::new(Mutex::new(None)),
        })
        .on_window_event(|window, event| {
            // ウィンドウが閉じられるときに、Browsersyncも終了する
            if let tauri::WindowEvent::CloseRequested { .. } = event {
                info!("Window closing...");
                let state: State<BrowsersyncState> = window.state();
                if let Err(e) = state.stop() {
                    error!("{e}");
                }
                // macOSでは、ウィンドウを閉じてもプロセスが残るため、明示的に終了
                window.app_handle().exit(0);
            }
        })
        .invoke_handler(tauri::generate_handler![
            get_host_os,
            directory_exists,
            check_installed_binaries,
            install_nodejs,
            install_browsersync,
            start_browsersync,
            stop_browsersync,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
