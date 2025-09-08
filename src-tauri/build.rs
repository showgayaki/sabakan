use dotenvy::dotenv;
use json_typegen_shared::{codegen, Options, OutputMode};
use std::fs;

fn main() {
    // .env を読み込み
    if dotenv().is_ok() {
        for (key, value) in std::env::vars() {
            if key == "MY_NAME" {
                println!("cargo:rustc-env={key}={value}");
            }
        }
    }

    #[cfg(target_os = "macos")]
    generate_menu_type();

    tauri_build::build()
}

#[cfg(target_os = "macos")]
fn generate_menu_type() {
    // Cargo.tomlからの相対パス
    let input_path = "../locales/ja/menu.json";
    let dest_path = "../src-tauri/src/types/menu.rs";

    let mut options = Options::default();
    options.output_mode = OutputMode::Rust;

    let generate_from_json =
        codegen("MenuTranslations", input_path, options).expect("Failed to generate menu type");

    // 既存のファイルを読む
    let needs_update = match std::fs::read_to_string(dest_path) {
        Ok(existing) => existing != generate_from_json,
        Err(_) => true, // ファイルがなければ生成
    };

    if needs_update {
        // Rust ファイルに書き出す
        fs::write(dest_path, generate_from_json).expect("Failed to write menu.rs");
    }
}
