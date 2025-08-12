use log::info;
use std::path::{Path, PathBuf};
use std::{fs, io};

#[cfg(unix)]
use std::os::unix::fs::PermissionsExt;

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
    fs::remove_file(path).map_err(|e| format!("Failed to remove file: {e}"))
}

/// 指定したファイルに実行権限（755）を付与
#[cfg(unix)]
pub fn set_executable(path: &Path) -> Result<(), String> {
    let metadata = fs::metadata(path).map_err(|e| format!("Failed to get metadata: {}", e))?;
    let mut permissions = metadata.permissions();
    permissions.set_mode(0o755);
    fs::set_permissions(path, permissions)
        .map_err(|e| format!("Failed to set permissions: {}", e))?;
    Ok(())
}

pub fn copy_file_to_dir(src_file_path: &Path, dest_dir_path: &Path) -> io::Result<PathBuf> {
    // コピー先ディレクトリを作成（存在しなければ）
    if !dest_dir_path.exists() {
        info!("Creating destination directory: {dest_dir_path:?}");
        fs::create_dir_all(dest_dir_path)?;
    }

    // コピー先のフルパス作成
    let file_name = src_file_path.file_name().ok_or_else(|| {
        io::Error::new(
            io::ErrorKind::InvalidInput,
            "src_file_path has no file name",
        )
    })?;

    let dest_file_path = dest_dir_path.join(file_name);

    // ファイルコピー（上書き）
    info!("Copying file from {src_file_path:?} to {dest_file_path:?}");
    fs::copy(src_file_path, &dest_file_path)?;

    Ok(dest_file_path)
}
