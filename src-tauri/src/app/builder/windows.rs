use tauri::Wry;

use super::base;

pub fn builder() -> tauri::Builder<Wry> {
    let base_builder = base::builder();
    base_builder.invoke_handler(tauri::generate_handler![
        crate::commands::fs::directory_exists,
        crate::features::browsersync::commands::start_browsersync,
        crate::features::browsersync::commands::stop_browsersync,
        crate::features::installation::commands::check_installed_binaries,
        crate::features::installation::commands::install_nodejs,
        crate::features::installation::commands::install_browsersync,
    ])
}
