use std::env;
use std::path::PathBuf;
use std::sync::{LazyLock, OnceLock};

pub(crate) const HOST_OS: &str = env::consts::OS;
pub(crate) const HOST_ARCH: &str = env::consts::ARCH;

pub(crate) static HOME_DIR: OnceLock<PathBuf> = OnceLock::new();

/// APP_DATA_DIR
///   debug:
///     macOS: /Users/{username}/.sabakan/
///     windows: C:\Users\{username}\.sabakan\
///   release:
///     macOS: /Users/{username}/Library/Containers/{identifier}}/Data/.sabakan/
///     windows: C:\Users\{username}\.sabakan\
pub(crate) static APP_DATA_DIR: LazyLock<PathBuf> = LazyLock::new(|| {
    HOME_DIR
        .get()
        .expect("HOME_DIR is not initialized")
        .join(".sabakan")
});

/// RESOURCE_DIR
///   debug:
///     macOS: /sabakan/src-tauri/bin/
///     windows: C:\Users\{username}\.sabakan\bin\
///   release:
///     macOS: /Applications/Sabakan.app/Contents/Resources/
///     windows: C:\Users\{username}\.sabakan\bin\
pub(crate) static RESOURCE_DIR: OnceLock<PathBuf> = OnceLock::new();
pub(crate) static BINARY_DIR: LazyLock<PathBuf> = LazyLock::new(|| {
    let resource_dir = RESOURCE_DIR.get().expect("RESOURCE_DIR is not initialized");
    resource_dir.join("bin")
});

#[cfg(windows)]
pub(crate) mod windows {
    use super::*;

    pub static NODE_DIR: LazyLock<PathBuf> = LazyLock::new(|| BINARY_DIR.join("node"));
}

pub(crate) static BROWSERSYNC_PATH: LazyLock<PathBuf> = LazyLock::new(|| {
    if cfg!(windows) {
        BINARY_DIR.join("browser-sync.cmd")
    } else {
        BINARY_DIR.join("browser-sync")
    }
});
