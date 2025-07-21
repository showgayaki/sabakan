use std::env;

use crate::constants::NODE_DIR;

pub fn add_path() {
    let current_path = env::var("PATH").unwrap_or_default();

    let node_path = if cfg!(windows) {
        NODE_DIR.clone()
    } else {
        NODE_DIR.join("bin")
    };

    let new_path = if cfg!(windows) {
        format!("{};{}", node_path.display(), current_path)
    } else {
        format!("{}:{}", node_path.display(), current_path)
    };

    env::set_var("PATH", new_path);
}
