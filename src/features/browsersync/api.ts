import { invoke } from "@tauri-apps/api/core";

export const getHostOS = (): Promise<string> =>
    invoke("get_host_os");

export const startBrowsersync = (directory: String): Promise<{ success: boolean }> =>
    invoke("start_browsersync", { directory });

export const stopBrowsersync = (): Promise<{ success: boolean }> =>
    invoke("stop_browsersync");
