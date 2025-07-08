import { useEffect, useState } from "react";

import { getHostOS } from "../api";
import useDirectory from "./useDirectory";
import useBrowsersync from "./useBrowsersync";
import useProxy from "./useProxy";
import useLogStream from "./useLogStream";

export default function useBrowsersyncForm() {
    const [hostOs, setHostOs] = useState<string>("");

    const directory = useDirectory(hostOs);
    const browsersync = useBrowsersync();
    const proxy = useProxy();
    const logStream = useLogStream();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validateDirectory = directory.validate();
        const validateProxy = proxy.validate();

        if (validateDirectory && validateProxy) {
            browsersync.handleStart(directory.path, proxy.url);
        }
    }

    useEffect(() => {
        getHostOS().then(setHostOs).catch(console.error);
    }, []);

    return {
        hostOs,
        directory,
        browsersync,
        proxy,
        logStream,
        handleSubmit,
    }
}
