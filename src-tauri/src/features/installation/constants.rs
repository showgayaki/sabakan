use std::path::PathBuf;
use std::sync::LazyLock;

use crate::constants::BINARY_DIR;

pub(crate) static NODE_DIR: LazyLock<PathBuf> = LazyLock::new(|| BINARY_DIR.join("node"));
