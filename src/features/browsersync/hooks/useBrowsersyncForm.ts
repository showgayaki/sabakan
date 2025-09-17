import type { BrowsersyncParams } from "@/types/browsersyncParams";

import useDirectory from "./useDirectory";
import useBrowsersync from "./useBrowsersync";
import useProxy from "./useProxy";
import useExtensions from "./useExtensions";
import useQrCode from "./LaunchingOverlay/useQrCode";
import useLogStream from "./LaunchingOverlay/useLogStream";

export default function useBrowsersyncForm() {
    const directory = useDirectory();
    const browsersync = useBrowsersync();
    const proxy = useProxy();
    const extensions = useExtensions();
    const qrCode = useQrCode();
    const logStream = useLogStream();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params: BrowsersyncParams = {
            targetDir: directory.path,
            proxyUrl: proxy.url,
            extensions: extensions.items,
        };

        const validateDirectory = await directory.validate();
        const validateProxy = proxy.validate();

        if (validateDirectory && validateProxy) {
            browsersync.handleStart(params);
        }
    }

    return {
        directory,
        browsersync,
        extensions,
        proxy,
        qrCode,
        logStream,
        handleSubmit,
    }
}
