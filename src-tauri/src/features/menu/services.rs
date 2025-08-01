use super::infrastructure;
use tauri::{menu::MenuEvent, AppHandle, Emitter, Manager, Runtime};

pub fn init_menu<R: Runtime>(app: &AppHandle<R>) {
    let menu = infrastructure::build_menu(app);
    app.set_menu(menu).expect("Failed to set menu");
}

pub fn handle_menu_event(app: &AppHandle, event: MenuEvent) {
    match event.id.as_ref() {
        "quit" => {
            if let Some(window) = app.get_webview_window("main") {
                window.close().unwrap();
            }
        }
        "about" => {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.emit("show_about", ());
            }
        }
        "help" => {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.emit("show_help", ());
            }
        }
        "license" => {
            if let Some(window) = app.get_webview_window("main") {
                let _ = window.emit("show_license", ());
            }
        }
        _ => {}
    }
}
