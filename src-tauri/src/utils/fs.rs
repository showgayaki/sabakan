use std::fs;
use std::os::unix::fs::PermissionsExt;
use std::path::Path;

// /// 指定したディレクトリがなければ作成する
// pub fn ensure_dir_exists(path: &Path) -> Result<(), String> {
//     if !path.exists() {
//         fs::create_dir_all(path).map_err(|e| format!("Failed to create directory: {}", e))?;
//     }
//     Ok(())
// }

// /// ファイルを読み込む
// pub fn read_file(path: &Path) -> Result<String, String> {
//     fs::read_to_string(path).map_err(|e| format!("Failed to read file: {}", e))
// }

// /// ファイルに書き込む
// pub fn write_file(path: &Path, content: &str) -> Result<(), String> {
//     fs::write(path, content).map_err(|e| format!("Failed to write file: {}", e))
// }

pub fn remove_file(path: &Path) -> Result<(), String> {
    fs::remove_file(path).map_err(|e| format!("Failed to remove file: {}", e))
}

/// 指定したファイルに実行権限（755）を付与
pub fn set_executable(path: &Path) -> Result<(), String> {
    let metadata = fs::metadata(path).map_err(|e| format!("Failed to get metadata: {}", e))?;
    let mut permissions = metadata.permissions();
    permissions.set_mode(0o755);
    fs::set_permissions(path, permissions)
        .map_err(|e| format!("Failed to set permissions: {}", e))?;
    Ok(())
}
