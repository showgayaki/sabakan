import { useHostOs } from "@/app/context";

import useDirectory from "./useDirectory";
import useBrowsersync from "./useBrowsersync";
import useProxy from "./useProxy";
import useLogStream from "./useLogStream";

export default function useBrowsersyncForm() {
    const hostOs = useHostOs();

    const directory = useDirectory(hostOs);
    const browsersync = useBrowsersync();
    const proxy = useProxy();
    const logStream = useLogStream();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validateDirectory = await directory.validate();
        const validateProxy = proxy.validate();

        if (validateDirectory && validateProxy) {
            browsersync.handleStart(directory.path, proxy.url);
        }
    }

    return {
        hostOs,
        directory,
        browsersync,
        proxy,
        logStream,
        handleSubmit,
    }
}
