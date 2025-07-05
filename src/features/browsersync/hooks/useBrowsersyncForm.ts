import { useEffect, useState } from "react";

import useDirectory from "./useDirectory";
import { getHostOS } from "../api";
import useBrowsersync from "./useBrowsersync";

export default function useBrowsersyncForm() {
    const [hostOs, setHostOs] = useState<string>("");
    const [useProxy, setUseProxy] = useState<boolean>(false);

    const directory = useDirectory(hostOs);
    const browsersync = useBrowsersync();

    useEffect(() => {
        getHostOS().then(setHostOs).catch(console.error);
    }, []);

    return {
        hostOs,
        directory,
        browsersync,
        useProxy,
        setUseProxy,
    }
}
