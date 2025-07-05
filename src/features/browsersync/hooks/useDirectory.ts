import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";

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

    const validate = () => {
        const message = validateDirectoryPath(path, hostOs);
        setError(message);
        console.log("Validation result:", message);

        setTimeout(() => {
            setError(null);
        }, 3000);
        return message === null;
    };

    return {
        path,
        setPath,
        error,
        validate,
        selectDirectory,
    }
}
