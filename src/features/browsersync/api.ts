import { invoke } from "@tauri-apps/api/core";

export const getHostOS = (): Promise<string> =>
    invoke("get_host_os");

export const startBrowsersync = (directory: String): Promise<{ success: boolean }> =>
    invoke("start_browser_sync", { directory: directory });
