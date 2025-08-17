use tauri::Wry;

mod base;
#[cfg(target_os = "macos")]
mod macos;
#[cfg(windows)]
mod windows;

pub fn builder() -> tauri::Builder<Wry> {
    #[cfg(target_os = "macos")]
    {
        macos::builder()
    }

    #[cfg(windows)]
    {
        windows::builder()
    }
}
