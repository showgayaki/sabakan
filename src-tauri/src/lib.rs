use log::{error, info};
use std::env;
use std::sync::{Arc, Mutex};
use tauri::{Manager, State};

mod bootstrap;
mod commands;
mod constants;
mod features;
mod utils;

use bootstrap::{init_app_data_dir, init_env_path, init_logger};
use commands::fs::directory_exists;
use commands::system::get_host_os;
use constants::{HOST_ARCH, HOST_OS};

use features::browsersync::commands::{start_browsersync, stop_browsersync};
use features::browsersync::services::BrowsersyncState;
use features::installation::commands::{
    check_installed_binaries, install_browsersync, install_nodejs,
};

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .manage(BrowsersyncState {
            process: Arc::new(Mutex::new(None)),
        })
        .setup(|app| {
            init_app_data_dir(app.path()); // APP_DATA_DIR を初期化
            init_logger(); // ロガー初期化
            init_env_path(); // PATH設定
            info!("Application started on {HOST_OS}({HOST_ARCH})");

            Ok(())
        })
        .on_window_event(|window, event| {
            // ウィンドウが閉じられるときに、Browsersyncも終了する
            if let tauri::WindowEvent::CloseRequested { .. } = event {
                info!("Window closing...");
                let state: State<BrowsersyncState> = window.state();
                if let Err(e) = state.stop() {
                    error!("{e}");
                }
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
