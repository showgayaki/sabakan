use log::debug;
use tauri::{command, State, Window};

use super::services::BrowsersyncState;

#[command]
pub async fn start_browsersync(
    window: Window,
    state: State<'_, BrowsersyncState>,
    target_dir: String,
    proxy_url: String,
) -> Result<String, String> {
    debug!("start_browsersync command called");
    state.start(window, &target_dir, &proxy_url).await
}

#[command]
pub fn stop_browsersync(state: State<'_, BrowsersyncState>) -> Result<bool, String> {
    debug!("stop_browsersync command called");
    state.stop()
}
