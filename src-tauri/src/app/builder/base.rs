use log::{error, info};
use std::sync::{Arc, Mutex};
use tauri::{Manager, State, Wry};

use crate::app::bootstrap::setup;
use crate::features::browsersync::services::BrowsersyncState;

pub fn builder() -> tauri::Builder<Wry> {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .manage(BrowsersyncState {
            process: Arc::new(Mutex::new(None)),
        })
        .setup(|app| {
            setup(app); // アプリケーションの初期設定
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
}
