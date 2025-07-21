use std::env;
use std::path::PathBuf;
use std::sync::LazyLock;

pub(crate) const HOST_OS: &str = env::consts::OS;
pub(crate) const HOST_ARCH: &str = env::consts::ARCH;

pub(crate) const APP_DIR_NAME: &str = ".sabakan";
pub(crate) static HOME_DIR: LazyLock<PathBuf> = LazyLock::new(|| {
    if cfg!(windows) {
        env::var("USERPROFILE")
            .map(PathBuf::from)
            .unwrap_or_else(|_| panic!("Failed to get USERPROFILE"))
    } else {
        env::var("HOME")
            .map(PathBuf::from)
            .unwrap_or_else(|_| panic!("Failed to get HOME"))
    }
});
pub(crate) static APP_DIR: LazyLock<PathBuf> = LazyLock::new(|| HOME_DIR.join(APP_DIR_NAME));
pub(crate) static BINARY_DIR: LazyLock<PathBuf> =
    LazyLock::new(|| HOME_DIR.join(APP_DIR_NAME).join("bin"));

pub(crate) static NODE_DIR: LazyLock<PathBuf> = LazyLock::new(|| BINARY_DIR.join("node"));
