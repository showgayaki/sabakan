use log::debug;
use tauri::{command, State, Window};

use super::services::BrowsersyncState;
use crate::types::browsersync::BrowsersyncParams;

#[command]
pub async fn start_browsersync(
    window: Window,
    state: State<'_, BrowsersyncState>,
    params: BrowsersyncParams,
) -> Result<String, String> {
    debug!("start_browsersync command called");
    state.start(&window, &params).await
}

#[command]
pub fn stop_browsersync(state: State<'_, BrowsersyncState>) -> Result<bool, String> {
    debug!("stop_browsersync command called");
    state.stop()
}
