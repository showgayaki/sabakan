import { useState } from "react";

import { ProgressStatus } from "@/types/progress";
import {
    startBrowsersync,
    stopBrowsersync,
} from "../api";

export default function useBrowsersync() {
    const MESSAGE_DISPLAY_DURATION_MS = 1000;  // メッセージ表示時間（ミリ秒）

    const [status, setStatus] = useState<ProgressStatus>("idle");
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    const [isShowQrCode, setIsShowQrCode] = useState<boolean>(false);

    const handleStart = async (directoryPath: string) => {
        setStatus("pending");
        setStatusMessage("Browsersyncを起動しています...");
        console.log("Starting Browsersync with directory:", directoryPath);

        try {
            const externalUrl = await startBrowsersync(directoryPath);
            console.log("Browsersync started at URL:", externalUrl);

            setUrl(externalUrl);
            setStatus("success");
            setStatusMessage("Browsersyncを起動しました");
            setIsRunning(true);
        } catch (error) {
            console.error("Failed to start Browsersync:", error);
            setStatus("error");
            setStatusMessage("Browsersyncの起動に失敗しました😭");
            setIsRunning(false);
        }

        setTimeout(() => {
            setStatusMessage(null);
            setIsShowQrCode(true);
        }, MESSAGE_DISPLAY_DURATION_MS);
    }

    const handleStop = async () => {
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
        }, MESSAGE_DISPLAY_DURATION_MS);
    }

    return {
        isRunning,
        status,
        statusMessage,
        handleStart,
        handleStop,
        url,
        isShowQrCode,
        setIsShowQrCode,
    }
}
