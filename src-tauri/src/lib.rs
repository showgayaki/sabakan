mod app;
mod commands;
mod constants;
mod features;

#[cfg(windows)]
mod utils;

use app::builder::builder;

pub fn run() {
    let builder = builder();
    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
