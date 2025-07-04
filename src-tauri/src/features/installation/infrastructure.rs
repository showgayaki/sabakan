pub(super) mod browsersync;
pub(super) mod node;

use log::{error, info};

use crate::constants::{BINARY_DIR, HOST_OS, NODE_DIR};
use crate::utils::archive::extract;
use crate::utils::fs::{remove_file, set_executable};
use crate::utils::network::download_file;

/// バイナリダウンロード
async fn install_binary(binary_name: String, url: String) -> Result<(), String> {
    let exec_path = if binary_name == "Node.js" {
        NODE_DIR.join("bin/node")
    } else {
        BINARY_DIR.join(&binary_name)
    };
    info!("Downloading {} from {:?}", &binary_name, &url);
    let dest_path = BINARY_DIR.join(url.split('/').last().unwrap());

    match download_file(&url, &dest_path).await {
        Ok(archive_path) => {
            info!(
                "Successfully downloaded {} to {:?}",
                &binary_name, &archive_path
            );

            if let Err(e) = extract(&archive_path, &BINARY_DIR) {
                return Err(format!("Failed to extract {}: {}", &binary_name, &e));
            } else {
                // macOS の場合は chmod +x
                if HOST_OS != "windows" {
                    set_executable(&exec_path).expect("Failed to set executable permissions");
                }
                info!("{} installed at {:?}", &binary_name, &exec_path);
                // アーカイブ削除
                match remove_file(&archive_path) {
                    Ok(()) => info!("Removed: {:?}", &archive_path),
                    Err(ref e) => error!("Failed to remove {:?}: {}", &archive_path, &e),
                }
            }
        }
        Err(e) => return Err(format!("Failed to download {}: {}", &binary_name, &e)),
    }

    Ok(())
}
