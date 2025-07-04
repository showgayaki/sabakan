use log::{error, info};
use std::process::Child;
use std::sync::{Arc, Mutex};
use tauri::AppHandle;

use super::infrastructure::process::{spawn_browsersync, stop_browsersync};

pub struct BrowsersyncState {
    pub(crate) process: Arc<Mutex<Option<Child>>>,
}

impl BrowsersyncState {
    pub async fn start(&self, app_handle: &AppHandle, target_dir: &str) -> Result<(), String> {
        let mut lock = self.process.lock().unwrap();
        if lock.is_some() {
            return Err("Browsersync already running".to_string());
        }

        let child = spawn_browsersync(target_dir).map_err(|e| e.to_string())?;
        *lock = Some(child);

        Ok(())
    }

    pub fn stop(&self) -> Result<(), String> {
        let mut lock = self.process.lock().unwrap();
        if let Some(mut process) = lock.take() {
            stop_browsersync(&mut process)?;
        }
        Ok(())
    }
}
