// use log::{debug, info};
// use tauri::{AppHandle, Emitter};
// use tokio::time::{sleep, Duration, Instant};

// use crate::constants::APPIUM_SERVER_URL;

// // Browsersyncが起動完了するまで `/status` をポーリング
// pub async fn wait_for_browsersync_ready(
//     app_handle: AppHandle,
//     timeout: Duration,
// ) -> Result<(), String> {
//     debug!("wait_for_browsersync_ready");
//     let start_time = Instant::now();
//     let client = reqwest::Client::new();

//     while start_time.elapsed() < timeout {
//         if let Ok(response) = client
//             .get(format!("{}/status", &*APPIUM_SERVER_URL))
//             .send()
//             .await
//         {
//             if response.status().is_success() {
//                 info!("Browsersync server started.");
//                 let _ = app_handle.emit("browsersyn_ready", ());
//                 return Ok(()); // Browsersync起動完了
//             }
//         }
//         sleep(Duration::from_millis(500)).await; // 500ms 待って再試行
//     }

//     Err("Timed out waiting for Browsersync to be ready".to_string())
// }
