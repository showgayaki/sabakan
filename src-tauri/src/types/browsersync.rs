use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Debug, Serialize, Deserialize, TS)]
#[ts(rename_all = "camelCase")]
#[serde(rename_all = "camelCase")]
#[ts(export_to = "../../src/types/browsersyncParams.ts")]
pub struct BrowsersyncParams {
    pub target_dir: String,
    pub proxy_url: String,
    pub extensions: Vec<String>, // チェックボックスで選んだ拡張子一覧
}
