import { invoke } from "@tauri-apps/api/core";

export const openLicenseWindow = (): Promise<string> =>
    invoke("open_license_window");
