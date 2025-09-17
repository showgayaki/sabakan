import { useState } from "react";

import type { TranslationKeys } from "@/types/i18next";
import type { BrowsersyncParams } from "@/types/browsersyncParams";
import type { BrowsersyncState } from "@/types/browsersyncForm";
import type { ProgressStatus } from "@/types/progress";
import { delayMs } from "@/utils/delay";

import {
    startBrowsersync,
    stopBrowsersync,
} from "../api";

export default function useBrowsersync(): BrowsersyncState {
    const MESSAGE_DISPLAY_DURATION_MS = 1000;  // メッセージ表示時間（ミリ秒）

    const [status, setStatus] = useState<ProgressStatus>("idle");
    const [statusMessage, setStatusMessage] = useState<TranslationKeys | undefined>(undefined);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");

    const handleStart = async (params: BrowsersyncParams) => {
        let startedSuccessfully = false;

        setStatus("pending");
        setStatusMessage("overlay.browsersync.starting");
        console.log("BrowsersyncParams:", params);

        try {
            const externalUrl = await startBrowsersync(params);
            console.log("Browsersync started at URL:", externalUrl);

            setUrl(externalUrl);
            setStatus("success");
            setStatusMessage("overlay.browsersync.started");

            startedSuccessfully = true;
        } catch (error) {
            console.error("Failed to start Browsersync:", error);
            setStatus("error");
            setStatusMessage("overlay.browsersync.startError");
            return;
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
        setStatusMessage("overlay.browsersync.stopping");

        await delayMs(1000);
        const result = await stopBrowsersync();

        if (result) {
            setStatus("success");
            setStatusMessage("overlay.browsersync.stopped");
            console.log("Browsersync stopped successfully.");
            stoppedSuccessfully = true;
        } else {
            setStatus("error");
            setStatusMessage("overlay.browsersync.stopError");
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
