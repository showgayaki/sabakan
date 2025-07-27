use std::env;
use std::path::PathBuf;
use std::sync::OnceLock;

pub(crate) const HOST_OS: &str = env::consts::OS;
pub(crate) const HOST_ARCH: &str = env::consts::ARCH;

pub(crate) static APP_DATA_DIR: OnceLock<PathBuf> = OnceLock::new();
pub(crate) static BROWSERSYNC_PATH: OnceLock<PathBuf> = OnceLock::new();
