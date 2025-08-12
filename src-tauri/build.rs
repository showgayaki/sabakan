use dotenvy::dotenv;

fn main() {
    // .env を読み込み
    if dotenv().is_ok() {
        for (key, value) in std::env::vars() {
            if key == "MY_NAME" {
                println!("cargo:rustc-env={key}={value}");
            }
        }
    }
    tauri_build::build()
}
