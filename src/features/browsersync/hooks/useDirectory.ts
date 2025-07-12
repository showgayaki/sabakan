import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";

import { ERROR_DISPLAY_DURATION_MS } from "@/constants/ui";
import { validateDirectoryPath } from "../utils/validate";

export default function useBrowsersyncForm(hostOs: string) {
    const [path, setPath] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const selectDirectory = async () => {
        console.log("Selecting directory...");
        const selected = await open({
            directory: true,
            multiple: false,
        });
        if (typeof selected === "string") {
            setPath(selected);
        }
    };

    const validate = async () => {
        const message = await validateDirectoryPath(path, hostOs);
        if (message) {
            console.log("Directory validation failed:", message);
            setError(message);

            setTimeout(() => {
                setError(null);
            }, ERROR_DISPLAY_DURATION_MS);
        }
        return message === null;
    };

    return {
        path,
        setPath,
        validate,
        selectDirectory,
        error,
    }
}
