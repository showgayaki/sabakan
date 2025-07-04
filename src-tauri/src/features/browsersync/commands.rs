use log::debug;
use tauri::{command, AppHandle, State};

use super::services::BrowsersyncState;

#[command]
pub async fn start_browsersync(
    state: State<'_, BrowsersyncState>,
    app_handle: AppHandle,
    target_dir: String,
) -> Result<(), String> {
    debug!("start_browsersync command called");
    state.start(&app_handle, &target_dir).await
}

#[command]
pub fn stop_browsersync(state: State<'_, BrowsersyncState>) -> Result<(), String> {
    debug!("stop_browsersync command called");
    state.stop()
}
