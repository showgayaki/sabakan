use log::info;
use std::process::Child;
use std::sync::{Arc, Mutex};

use super::infrastructure::process::{spawn_browsersync, stop_browsersync};

pub struct BrowsersyncState {
    pub(crate) process: Arc<Mutex<Option<Child>>>,
}

impl BrowsersyncState {
    pub async fn start(&self, target_dir: &str) -> Result<String, String> {
        let mut lock = self.process.lock().unwrap();
        if lock.is_some() {
            return Err("Browsersync already running".to_string());
        }

        let (child, external_url) = spawn_browsersync(target_dir).map_err(|e| e.to_string())?;
        info!("Browsersync process started with PID: {}", child.id());
        *lock = Some(child);

        Ok(external_url)
    }

    pub fn stop(&self) -> Result<(), String> {
        let mut lock = self.process.lock().unwrap();
        if let Some(mut process) = lock.take() {
            info!("Stopping Browsersync process...");
            stop_browsersync(&mut process)?;
            info!("Browsersync stopped.");
        } else {
            info!("No Browsersync process to stop.");
        }
        Ok(())
    }
}
