mod app;
mod commands;
mod constants;
mod features;
mod types;

#[cfg(windows)]
mod utils;

use app::builder::builder;

pub fn run() {
    // Browsersyncのパラメータの型をReact用にエクスポート
    #[cfg(debug_assertions)]
    {
        use ts_rs::TS;
        use types::browsersync::BrowsersyncParams;
        BrowsersyncParams::export().unwrap();
    }

    let builder = builder();
    builder
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
