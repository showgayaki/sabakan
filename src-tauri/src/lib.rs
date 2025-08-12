use log::{error, info};
use std::env;
use std::sync::{Arc, Mutex};
use tauri::{Manager, State};

mod bootstrap;
mod commands;
mod constants;
mod features;
mod utils;

use bootstrap::{copy_browser_sync_cmd, init_app_dir, init_logger};
use commands::fs::directory_exists;
use constants::{HOST_ARCH, HOST_OS};

use features::browsersync::commands::{start_browsersync, stop_browsersync};
use features::browsersync::services::BrowsersyncState;
use features::menu::services::{handle_menu_event, init_menu};

#[cfg(windows)]
use features::installation::commands::{
    check_installed_binaries, install_browsersync, install_nodejs,
};

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .manage(BrowsersyncState {
            process: Arc::new(Mutex::new(None)),
        })
        .setup(|app| {
            let resolver = app.path();

            init_app_dir(resolver); // ディレクトリ初期化
            init_logger(); // ロガー初期化

            #[cfg(windows)]
            copy_browser_sync_cmd(resolver);

            init_menu(app.app_handle()); // メニュー初期化

            info!("Application started on {HOST_OS}({HOST_ARCH})");
            Ok(())
        })
        .on_menu_event(|app, event| {
            handle_menu_event(app, event);
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
            directory_exists,
            start_browsersync,
            stop_browsersync,
            #[cfg(windows)]
            check_installed_binaries,
            #[cfg(windows)]
            install_nodejs,
            #[cfg(windows)]
            install_browsersync,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
