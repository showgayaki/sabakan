import { useHostOs } from "@/app/context";

import type { BrowsersyncParams } from "@/types/browsersyncParams";
import useDirectory from "./useDirectory";
import useBrowsersync from "./useBrowsersync";
import useProxy from "./useProxy";
import useExtensions from "./useExtensions";
import useLogStream from "./useLogStream";

export default function useBrowsersyncForm() {
    const hostOs = useHostOs();

    const directory = useDirectory(hostOs);
    const browsersync = useBrowsersync();
    const proxy = useProxy();
    const extensions = useExtensions();
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
        hostOs,
        directory,
        browsersync,
        extensions,
        proxy,
        logStream,
        handleSubmit,
    }
}
