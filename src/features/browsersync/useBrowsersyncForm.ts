import { useEffect, useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";

import { ProgressStatus } from "@/types/progress";
import {
    getHostOS,
    startBrowsersync,
    stopBrowsersync,
} from "./api";

export default function useBrowsersyncForm() {
    const [hostOs, setHostOs] = useState<string>("");
    const [directory, setDirectory] = useState<string>("");
    const [directoryError, setDirectoryError] = useState<string | null>(null);
    const [status, setStatus] = useState<ProgressStatus>("idle");
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
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

    const handleStartBrowsersync = async (directory: string) => {
        if (!validate()) {
            console.error("Validation failed, cannot start Browsersync.");
            return;
        }

        setStatus("pending");
        setStatusMessage("Browsersyncを起動しています...");
        console.log("Starting Browsersync with directory:", directory);
        const externalUrl = await startBrowsersync(directory);

        if (!externalUrl) {
            console.error("Failed to start Browsersync.");
            setStatus("error");
            setStatusMessage("Browsersyncの起動に失敗しました😭");
            setIsRunning(false);
        } else {
            console.log("Browsersync started at URL:", externalUrl);
            setStatus("success");
            setStatusMessage("Browsersyncを起動しました");
            setIsRunning(true);
        }

        setTimeout(() => {
            setStatusMessage(null);
        }, 1500);
    }

    const handleStopBrowsersync = async () => {
        console.log("Stopping Browsersync...");

        setStatus("pending");
        setStatusMessage("Browsersyncを停止しています...");
        const result = await stopBrowsersync();

        if (result) {
            setStatus("success");
            setStatusMessage("Browsersyncを停止しました");
            setIsRunning(false);
            console.log("Browsersync stopped successfully.");
        } else {
            setStatus("error");
            setStatusMessage("Browsersyncの停止に失敗しました😭");
            console.error("Failed to stop Browsersync.");
        }

        setTimeout(() => {
            setStatusMessage(null);
        }, 1500);
    }

    useEffect(() => {
        getHostOS().then(setHostOs).catch(console.error);
    }, []);

    return {
        hostOs,
        directory,
        setDirectory,
        directoryError,
        isRunning,
        status,
        statusMessage,
        selectDirectory,
        handleStartBrowsersync,
        handleStopBrowsersync,
    }
}
