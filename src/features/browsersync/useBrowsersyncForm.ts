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

    useEffect(() => {
        getHostOS().then(setHostOs).catch(console.error);
    }, []);

    return {
        hostOs,
        directory,
        setDirectory,
        selectDirectory,
        startBrowsersync,
        stopBrowsersync,
        isRunning,
        setIsRunning,
    }
}
