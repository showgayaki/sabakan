use tauri::{Manager, Wry};

use crate::app::bootstrap::setup;
use crate::app::menu::services::{handle_menu_event, init_menu};

pub fn builder() -> tauri::Builder<Wry> {
    let base_builder = base::builder();
    base_builder
        .on_menu_event(|app, event| {
            handle_menu_event(app, event);
        })
        .invoke_handler(tauri::generate_handler![
            crate::commands::fs::directory_exists,
            crate::features::browsersync::commands::start_browsersync,
            crate::features::browsersync::commands::stop_browsersync,
        ])
}
