use std::env;
use std::path::PathBuf;
use std::sync::{LazyLock, OnceLock};

pub(crate) const HOST_OS: &str = env::consts::OS;
pub(crate) const HOST_ARCH: &str = env::consts::ARCH;

pub(crate) static APP_DATA_DIR: OnceLock<PathBuf> = OnceLock::new();
pub(crate) static BINARY_DIR: LazyLock<PathBuf> = LazyLock::new(|| {
    APP_DATA_DIR
        .get()
        .expect("APP_DATA_DIR is not initialized")
        .join("bin")
});
pub(crate) static BROWSERSYNC_PATH: OnceLock<PathBuf> = OnceLock::new();
