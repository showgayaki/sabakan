import { Stack } from "@mui/material";

import useBrowsersyncForm from "../hooks/useBrowsersyncForm";
import Directory from "./Directory";
import Extensions from "./Extensions";
import Sync from "./Sync";
import Proxy from "./Proxy";
import Submit from "./Submit";
import LaunchingOverlay from "./LaunchingOverlay";

export default function BrowsersyncForm() {
    const {
        directory,
        browsersync,
        extensions,
        sync,
        proxy,
        qrCode,
        logStream,
        handleSubmit,
    } = useBrowsersyncForm();

    return (
        <>
            {browsersync.status !== "idle" &&
                <LaunchingOverlay
                    browsersync={browsersync}
                    qrCode={qrCode}
                    logStream={logStream}
                />
            }
            <Stack
                component="form"
                justifyContent="space-between"
                onSubmit={handleSubmit}
                sx={{flexGrow: 1}}
            >
                <Stack spacing={2}>
                    <Directory directory={directory} />
                    <Extensions extensions={extensions} />
                    <Sync sync={sync} />
                    <Proxy proxy={proxy}/>
                </Stack>
                {browsersync.status === "idle" &&
                    <Submit />
                }
            </Stack>
        </>
    );
}
