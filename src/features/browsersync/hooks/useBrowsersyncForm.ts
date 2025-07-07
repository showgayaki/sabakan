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

    useEffect(() => {
        getHostOS().then(setHostOs).catch(console.error);
    }, []);

    return {
        hostOs,
        directory,
        browsersync,
        proxy,
        logStream,
    }
}
