use log::info;
use sys_locale::get_locale;
use tauri::command;

#[command]
pub fn get_os_locale() -> String {
    // OS のロケールを取得
    let locale = get_locale().unwrap_or_else(|| "en-US".to_string());
    // let locale = "en-US".to_string();
    // 先頭2文字だけ取り出す（例: "ja-JP" → "ja"）
    let lang = locale.split('-').next().unwrap_or("en").to_string();
    info!("Detected locale: {}, using language: {}", locale, lang);
    lang
}
