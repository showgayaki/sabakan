use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Serialize, Deserialize, TS, Clone)]
#[ts(rename_all = "camelCase")]
#[serde(rename_all = "camelCase")]
#[ts(export_to = "../../src/types/browsersyncParams.ts")]
pub struct BrowsersyncParams {
    pub target_dir: String,
    pub proxy_url: String,
    pub extensions: Vec<String>,
    pub ghost_mode: GhostMode,
}

#[derive(Debug, Serialize, Deserialize, TS, Clone)]
#[ts(rename_all = "camelCase")]
#[serde(rename_all = "camelCase")]
#[ts(export_to = "../../src/types/browsersyncParams.ts")]
pub struct GhostMode {
    pub clicks: bool,
    pub scroll: bool,
    pub forms: bool,
}
