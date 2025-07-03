import { useEffect, useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";

import {
    getHostOS,
    startBrowsersync,
    stopBrowsersync,
} from "./api";

export default function useBrowsersyncForm() {
    const [hostOs, setHostOs] = useState<string>("");
    const [directory, setDirectory] = useState<string>("");
    const [directoryError, setDirectoryError] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const selectDirectory = async () => {
        console.log("Selecting directory...");
        const selected = await open({
            directory: true,
            multiple: false,
        });
        if (typeof selected === "string") {
            setDirectory(selected);
        }
    };

    const validate = () => {
        let hasError = false;

        if (!directory) {
            setDirectoryError("ディレクトリを選択してください");
            hasError = true;
        }

        if (hasError) {
            setTimeout(() => {
                setDirectoryError(null);
            }, 3000);
            return false;
        }

        return true;
    }

    useEffect(() => {
        getHostOS().then(setHostOs).catch(console.error);
    }, []);

    return {
        hostOs,
        directory,
        setDirectory,
        selectDirectory,
        directoryError,
        validate,
        startBrowsersync,
        stopBrowsersync,
        isRunning,
        setIsRunning,
    }
}
