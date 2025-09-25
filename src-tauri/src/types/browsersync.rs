use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fmt::Write;
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

impl BrowsersyncParams {
    pub fn pretty_print(&self) -> String {
        let mut out = String::new();
        writeln!(out, "Options:").unwrap();
        writeln!(out, "-------------------------------------").unwrap();

        writeln!(out, "target_dir: {}", self.target_dir).unwrap();

        if !self.proxy_url.trim().is_empty() {
            writeln!(out, "proxy: {}", self.proxy_url).unwrap();
        }

        writeln!(out, "extensions: [").unwrap();
        for ext in &self.extensions {
            writeln!(out, "    \"{}\",", ext).unwrap();
        }
        writeln!(out, "]").unwrap();

        writeln!(out, "ghost_mode: {{").unwrap();
        for (key, value) in self.ghost_mode.as_map() {
            writeln!(out, "    {}: {},", key, value).unwrap();
        }
        writeln!(out, "}}").unwrap();
        writeln!(out, "-------------------------------------").unwrap();

        out
    }
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

impl GhostMode {
    /// フィールド名 → 値 の対応を `HashMap` で返します
    pub fn as_map(&self) -> HashMap<&'static str, bool> {
        let mut map = HashMap::new();
        map.insert("clicks", self.clicks);
        map.insert("scroll", self.scroll);
        map.insert("forms", self.forms);
        map
    }
}
