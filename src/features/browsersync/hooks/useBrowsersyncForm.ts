import type { BrowsersyncParams } from "@/types/browsersyncParams";

import useDirectory from "./useDirectory";
import useBrowsersync from "./useBrowsersync";
import useGhostMode from "./useGhostMode";
import useExtensions from "./useExtensions";
import useProxy from "./useProxy";
import useQrCode from "./LaunchingOverlay/useQrCode";
import useLogStream from "./LaunchingOverlay/useLogStream";
import { useEffect } from "react";

export default function useBrowsersyncForm() {
    const directory = useDirectory();
    const browsersync = useBrowsersync();
    const extensions = useExtensions();
    const ghostMode = useGhostMode();
    const proxy = useProxy();
    const qrCode = useQrCode();
    const logStream = useLogStream();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params: BrowsersyncParams = {
            targetDir: directory.path,
            proxyUrl: proxy.url,
            extensions: extensions.items,
            ghostMode: {
                scroll: ghostMode.scroll,
                clicks: ghostMode.clicks,
                forms: ghostMode.forms,
            },
        };

        const validateDirectory = await directory.validate();
        const validateProxy = proxy.validate();

        if (validateDirectory && validateProxy) {
            browsersync.handleStart(params);
        }
    }

    useEffect(() => {
        if (browsersync.status === "idle") {
            logStream.setLines([]);
        }
    }, [browsersync.status]);

    return {
        directory,
        browsersync,
        extensions,
        ghostMode,
        proxy,
        qrCode,
        logStream,
        handleSubmit,
    }
}
