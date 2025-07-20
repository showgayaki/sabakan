import { useState } from "react";

import type { ProgressStatus } from "@/types/progress";
import {
    startBrowsersync,
    stopBrowsersync,
} from "../api";
import { delayMs } from "@/utils/delay";

export default function useBrowsersync() {
    const MESSAGE_DISPLAY_DURATION_MS = 1000;  // メッセージ表示時間（ミリ秒）

    const [status, setStatus] = useState<ProgressStatus>("idle");
    const [statusMessage, setStatusMessage] = useState<string | undefined>("Browsersyncを起動しています..");
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");

    const handleStart = async (directoryPath: string, proxyUrl: string) => {
        let startedSuccessfully = false;

        setStatus("pending");
        setStatusMessage("Browsersyncを起動しています...");
        console.log("Starting Browsersync with directory:", directoryPath);
        console.log("Using proxy URL:", proxyUrl);

        try {
            const externalUrl = await startBrowsersync(directoryPath, proxyUrl);
            console.log("Browsersync started at URL:", externalUrl);

            setUrl(externalUrl);
            setStatus("success");
            setStatusMessage("Browsersyncを起動しました");

            startedSuccessfully = true;
        } catch (error) {
            console.error("Failed to start Browsersync:", error);
            setStatus("error");
            setStatusMessage("Browsersyncの起動に失敗しました😭");
            setIsRunning(false);
        }

        setTimeout(() => {
            setStatusMessage(undefined);
            if (startedSuccessfully) {
                setIsRunning(true);
            }
        }, MESSAGE_DISPLAY_DURATION_MS);
    }

    const handleStop = async () => {
        let stoppedSuccessfully = false;
        console.log("Stopping Browsersync...");

        setStatus("pending");
        setIsRunning(false);
        setStatusMessage("Browsersyncを停止しています...");

        await delayMs(1000);
        const result = await stopBrowsersync();

        if (result) {
            setStatus("success");
            setStatusMessage("Browsersyncを停止しました");
            console.log("Browsersync stopped successfully.");
            stoppedSuccessfully = true;
        } else {
            setStatus("error");
            setStatusMessage("Browsersyncの停止に失敗しました😭");
            console.error("Failed to stop Browsersync.");
            setIsRunning(true);
        }

        setTimeout(() => {
            if (stoppedSuccessfully) {
                setStatus("idle");
            }
            setStatusMessage(undefined);
        }, MESSAGE_DISPLAY_DURATION_MS);
    }

    return {
        isRunning,
        status,
        statusMessage,
        handleStart,
        handleStop,
        url,
    }
}
