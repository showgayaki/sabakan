import { invoke } from "@tauri-apps/api/core";

export const getHostOS = (): Promise<string> =>
    invoke("get_host_os");

export const startBrowsersync = (targetDir: String, proxyUrl: String): Promise<string> =>
    invoke("start_browsersync", { targetDir, proxyUrl });

export const stopBrowsersync = (): Promise<{ success: boolean }> =>
    invoke("stop_browsersync");
