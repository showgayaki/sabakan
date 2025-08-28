import { invoke } from "@tauri-apps/api/core";

import type { BrowsersyncParams } from "@/types/browsersyncParams";

export const startBrowsersync = (params: BrowsersyncParams): Promise<string> =>
    invoke("start_browsersync", { params });

export const stopBrowsersync = (): Promise<{ success: boolean }> =>
    invoke("stop_browsersync");

export const directoryExists = (path: String): Promise<boolean> =>
    invoke("directory_exists", { path });
