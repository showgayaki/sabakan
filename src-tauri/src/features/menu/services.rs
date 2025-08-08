use log::debug;
use tauri::{menu::MenuEvent, AppHandle, Emitter, Manager, Runtime};

use super::infrastructure::build_menu;

pub fn init_menu<R: Runtime>(app: &AppHandle<R>) {
    let menu = build_menu(app);
    app.set_menu(menu).expect("Failed to set menu");
}

pub fn handle_menu_event(app: &AppHandle, event: MenuEvent) {
    debug!("Menu event received: {:?}", event);
    match event.id.as_ref() {
        "quit" => {
            debug!("Quit menu item clicked");
            if let Some(window) = app.get_webview_window("main") {
                window.close().unwrap();
            }
        }
        "help" => {
            debug!("Help menu item clicked");
            if let Some(window) = app.get_webview_window("main") {
                // Reactにヘルプを開くイベントを送信
                let _ = window.emit("open_help", ());
            }
        }
        "license" => {
            debug!("License menu item clicked");
            if let Some(window) = app.get_webview_window("main") {
                // Reactにライセンスを開くイベントを送信
                let _ = window.emit("open_license", ());
            }
        }
        _ => {}
    }
}
