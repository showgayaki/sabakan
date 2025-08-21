use log::info;
use std::process::Child;
use std::sync::{Arc, Mutex};
use tauri::Window;

use super::infrastructure::command::browsersync_command;
use super::infrastructure::process::{spawn_browsersync, stop_browsersync};
use crate::types::browsersync::BrowsersyncParams;

pub struct BrowsersyncState {
    pub(crate) process: Arc<Mutex<Option<Child>>>,
}

impl BrowsersyncState {
    pub async fn start(
        &self,
        window: &Window,
        params: &BrowsersyncParams,
    ) -> Result<String, String> {
        let mut lock = self.process.lock().unwrap();

        let command = browsersync_command(&params)?;
        let (child, external_url) =
            spawn_browsersync(window, command).map_err(|e| e.to_string())?;
        info!("Browsersync process started with PID: {}", child.id());
        *lock = Some(child);

        Ok(external_url)
    }

    pub fn stop(&self) -> Result<bool, String> {
        let mut lock = self.process.lock().unwrap();
        if let Some(mut process) = lock.take() {
            info!("Stopping Browsersync process...");
            stop_browsersync(&mut process)?;
            info!("Browsersync stopped.");
        } else {
            info!("No Browsersync process to stop.");
        }
        Ok(true)
    }
}
