import { Stack } from "@mui/material";

import useBrowsersyncForm from "../hooks/useBrowsersyncForm";
import Directory from "./Directory";
import Proxy from "./Proxy";
import Extensions from "./Extensions";
import Submit from "./Submit";
import LaunchingOverlay from "./LaunchingOverlay";

export default function BrowsersyncForm() {
    const {
        directory,
        browsersync,
        extensions,
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
                    <Proxy proxy={proxy}/>
                </Stack>
                {browsersync.status === "idle" &&
                    <Submit />
                }
            </Stack>
        </>
    );
}
