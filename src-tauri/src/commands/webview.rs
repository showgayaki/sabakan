use tauri::{command, AppHandle, WebviewUrl, WebviewWindowBuilder};

#[command]
pub fn open_license_window(app_window: AppHandle) -> Result<(), String> {
    WebviewWindowBuilder::new(
        &app_window,
        "license-window",
        WebviewUrl::App("/licenses/NOTICE.html".into()),
    )
    .title("ライセンス")
    .inner_size(370.0, 600.0)
    .resizable(true)
    .build()
    .map_err(|e| e.to_string())?;

    Ok(())
}
