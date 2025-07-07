import { invoke } from "@tauri-apps/api/core";

export const checkInstalledBinaries = (): Promise<string[]> =>
    invoke("check_installed_binaries");

export const installTask = (taskKey: string): Promise<void> =>
    invoke(taskKey);
