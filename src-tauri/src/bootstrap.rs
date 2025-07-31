use log::info;
use std::env;
use std::path::PathBuf;
use std::sync::LazyLock;
use tauri::path::PathResolver;
use tauri::Runtime;

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

use crate::constants::{APP_DATA_DIR, BROWSERSYNC_PATH};

pub fn init_app_data_dir<R: Runtime>(resolver: &PathResolver<R>) {
    let data_dir = resolver
        .home_dir()
        .expect("Failed to get home_dir")
        .join(".sabakan");

    APP_DATA_DIR
        .set(data_dir)
        .expect("APP_DATA_DIR already initialized");
}

pub fn init_browsersync_path<R: Runtime>(resolver: &PathResolver<R>) {
    let resource_path = if cfg!(debug_assertions) {
        // 開発モード：Cargo.tomlがあるディレクトリをベースにする
        PathBuf::from(env!("CARGO_MANIFEST_DIR"))
    } else {
        // リリースモード：resource_dir() で Resources ディレクトリを取得
        resolver.resource_dir().expect("Missing resource_dir")
    };
    info!("resource_path: {resource_path:?}");

    let browsersync_binary = if cfg!(target_os = "windows") {
        "browser-sync.cmd"
    } else {
        "browser-sync"
    };
    let browsersync_path = resource_path.join("binaries").join(browsersync_binary);

    BROWSERSYNC_PATH
        .set(browsersync_path)
        .expect("BROWSESYNC_PATH already initialized");
    info!("BROWSESYNC_PATH: {BROWSERSYNC_PATH:?}");
}

pub fn init_logger() {
    const LOG_FILE_NAME: &str = "sabakan.log";
    const LOG_ROTATE_BASE: u32 = 1;
    const LOG_ROTATE_COUNT: u32 = 3;
    const MB: u64 = 1024 * 1024;
    const LOG_ROTATE_SIZE_MB: u64 = 3;
    const LOG_ROTATE_SIZE: u64 = LOG_ROTATE_SIZE_MB * MB;
    // ログのフォーマット
    const LOG_PATTERN: &str = "[{d(%Y-%m-%d %H:%M:%S%:z)}] [{l}] [{f}:{L}]: {m}{n}";

    static LOG_DIR: LazyLock<PathBuf> = LazyLock::new(|| {
        APP_DATA_DIR
            .get()
            .expect("APP_DATA_DIR is not initialized")
            .join("log")
    });

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
