import { useState } from "react";

import { MESSAGE_DISPLAY_DURATION_MS } from "@/constants/ui"
import type { TranslationKeys } from "@/types/i18next";
import type { BrowsersyncParams } from "@/types/browsersyncParams";
import type { BrowsersyncStore } from "@/types/browsersyncForm";
import type { ProgressStatus } from "@/types/progress";
import { delayMs } from "@/utils/delay";

import {
    startBrowsersync,
    stopBrowsersync,
} from "../api";

export default function useBrowsersync(): BrowsersyncStore {
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
        }

        setTimeout(() => {
            setStatusMessage(undefined);
            if (startedSuccessfully) {
                setIsRunning(true);
            } else {
                setStatus("idle");
            }
        }, MESSAGE_DISPLAY_DURATION_MS);
    }

    const handleStop = async () => {
        let stoppedSuccessfully = false;
        console.log("Stopping Browsersync...");

        setStatus("pending");
        setIsRunning(false);
        setStatusMessage("overlay.browsersync.stopping");

        const result = await stopBrowsersync();
        await delayMs(500);

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
