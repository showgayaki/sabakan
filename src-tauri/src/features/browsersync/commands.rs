use log::debug;
use tauri::{command, State};

use super::services::BrowsersyncState;

#[command]
pub async fn start_browsersync(
    state: State<'_, BrowsersyncState>,
    target_dir: String,
    proxy_url: String,
) -> Result<String, String> {
    debug!("start_browsersync command called");
    state.start(&target_dir, &proxy_url).await
}

#[command]
pub fn stop_browsersync(state: State<'_, BrowsersyncState>) -> Result<bool, String> {
    debug!("stop_browsersync command called");
    state.stop()
}
