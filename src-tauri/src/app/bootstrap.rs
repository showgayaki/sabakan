use log::info;
use std::env;
use std::path::PathBuf;
use std::sync::LazyLock;
use tauri::path::PathResolver;
use tauri::{App, Manager, Runtime};

use log4rs::{
    append::rolling_file::{
        policy::compound::{
            roll::fixed_window::FixedWindowRoller, trigger::size::SizeTrigger, CompoundPolicy,
        },
        RollingFileAppender,
    },
    config::{Appender, Config, Logger, Root},
    encode::pattern::PatternEncoder,
};

use crate::constants::{
    APP_DATA_DIR, BROWSERSYNC_PATH, HOME_DIR, HOST_ARCH, HOST_OS, RESOURCE_DIR,
};

#[cfg(target_os = "macos")]
use crate::app::menu::services::init_menu;

#[cfg(windows)]
use crate::constants::BINARY_DIR;
#[cfg(windows)]
use crate::utils::fs::copy_file_to_dir;

pub fn setup(app: &App) {
    let resolver = app.path();

    init_app_dir(resolver); // ディレクトリ初期化
    init_logger(); // ロガー初期化

    info!("Application started on {HOST_OS}({HOST_ARCH})");

    #[cfg(target_os = "macos")]
    init_menu(app.app_handle());

    #[cfg(windows)]
    copy_browser_sync_cmd(resolver);
}

#[cfg(windows)]
pub fn copy_browser_sync_cmd<R: Runtime>(resolver: &PathResolver<R>) {
    if !BROWSERSYNC_PATH.exists() {
        let resource_dir = resolver.resource_dir().expect("Missing resource_dir");
        info!("resource_dir: {resource_dir:?}");
        if let Err(e) = copy_file_to_dir(
            &resource_dir.join("bin").join("browser-sync.cmd"),
            &BINARY_DIR,
        ) {
            panic!("Failed to copy browser-sync.cmd: {e}");
        }
        info!("Copied browser-sync.cmd to {BROWSERSYNC_PATH:?}");
    } else {
        info!("browser-sync.cmd already exists at {BROWSERSYNC_PATH:?}");
    }
}

fn init_app_dir<R: Runtime>(resolver: &PathResolver<R>) {
    let home_dir = resolver.home_dir().expect("Failed to get home_dir");

    HOME_DIR.set(home_dir).expect("Failed to set HOME_DIR");
    info!("HOME_DIR set to {HOME_DIR:?}");

    let resource_dir = if cfg!(windows) {
        // C:\Users\{username}\.sabakan\
        APP_DATA_DIR.clone()
    } else if cfg!(debug_assertions) {
        // macOS
        // 開発モード：Cargo.tomlがあるディレクトリをベースにする
        PathBuf::from(env!("CARGO_MANIFEST_DIR"))
    } else {
        // リリースモード
        // /Applications/Sabakan.app/Contents/Resources/
        resolver.resource_dir().expect("Missing resource_dir")
    };

    RESOURCE_DIR
        .set(resource_dir)
        .expect("Failed to set RESOURCE_DIR");

    info!("RESOURCE_DIR: {RESOURCE_DIR:?}");
    info!("BROWSESYNC_PATH: {BROWSERSYNC_PATH:?}");
}

fn init_logger() {
    const LOG_FILE_NAME: &str = "sabakan.log";
    const LOG_ROTATE_BASE: u32 = 1;
    const LOG_ROTATE_COUNT: u32 = 3;
    const MB: u64 = 1024 * 1024;
    const LOG_ROTATE_SIZE_MB: u64 = 3;
    const LOG_ROTATE_SIZE: u64 = LOG_ROTATE_SIZE_MB * MB;
    // ログのフォーマット
    const LOG_PATTERN: &str = "[{d(%Y-%m-%d %H:%M:%S%:z)}] [{l}] [{f}:{L}]: {m}{n}";

    static LOG_DIR: LazyLock<PathBuf> = LazyLock::new(|| APP_DATA_DIR.join("log"));

    // `sabakan.log` を `sabakan-{}.log` に変換
    let log_pattern = {
        let path = PathBuf::from(LOG_FILE_NAME);
        if let Some(ext) = path.extension() {
            let stem = path.file_stem().unwrap_or_default().to_string_lossy();
            format!(
                "{}/{}-{{}}.{}",
                LOG_DIR.display(),
                stem,
                ext.to_string_lossy()
            ) // sabakan-{}.log
        } else {
            format!("{}/{}-{{}}", LOG_DIR.display(), LOG_FILE_NAME) // sabakan-{}
        }
    };

    let stdout = log4rs::append::console::ConsoleAppender::builder()
        .encoder(Box::new(PatternEncoder::new(LOG_PATTERN)))
        .build();

    let file = RollingFileAppender::builder()
        .encoder(Box::new(PatternEncoder::new(LOG_PATTERN)))
        .build(
            LOG_DIR.join(LOG_FILE_NAME),
            Box::new(CompoundPolicy::new(
                Box::new(SizeTrigger::new(LOG_ROTATE_SIZE)),
                Box::new(
                    FixedWindowRoller::builder()
                        .base(LOG_ROTATE_BASE)
                        .build(&log_pattern, LOG_ROTATE_COUNT)
                        .unwrap(),
                ),
            )),
        )
        .unwrap();

    let config = Config::builder()
        .appender(Appender::builder().build("stdout", Box::new(stdout)))
        .appender(Appender::builder().build("file", Box::new(file)))
        .logger(
            Logger::builder()
                .appender("file")
                .build("default_logger", log::LevelFilter::Debug),
        )
        .build(
            Root::builder()
                .appender("stdout")
                .appender("file")
                .build(log::LevelFilter::Debug),
        )
        .unwrap();

    log4rs::init_config(config).unwrap();

    info!(
        "Logger initialized. Log file: {}",
        LOG_DIR.join(LOG_FILE_NAME).display()
    );
}
