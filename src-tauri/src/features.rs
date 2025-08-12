pub(crate) mod browsersync;

#[cfg(target_os = "macos")]
pub(crate) mod menu;

#[cfg(windows)]
pub(crate) mod installation;
