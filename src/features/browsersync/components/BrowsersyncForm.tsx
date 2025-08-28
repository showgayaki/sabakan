import { Stack } from "@mui/material";

import useBrowsersyncForm from "../hooks/useBrowsersyncForm";
import Directory from "./Directory";
import Proxy from "./Proxy";
import Extensions from "./Extensions";
import Submit from "./Submit";
import LaunchingOverlay from "./LaunchingOverlay";

export default function BrowsersyncForm() {
    const {
        hostOs,
        directory,
        browsersync,
        extensions,
        proxy,
        logStream,
        handleSubmit,
    } = useBrowsersyncForm();

    return (
        <>
            {browsersync.status !== "idle" &&
                <LaunchingOverlay
                    status={browsersync.status}
                    statusMessage={browsersync.statusMessage}
                    isRunning={browsersync.isRunning}
                    url={browsersync.url}
                    logs={logStream.lines}
                    logContainerRef={logStream.containerRef}
                    handleStopBrowsersync={async () => {
                        await browsersync.handleStop();
                        // LogStreamをクリア
                        logStream.setLines([]);
                    }}
                />
            }
            <Stack
                component="form"
                justifyContent="space-between"
                onSubmit={handleSubmit}
                sx={{flexGrow: 1}}
            >
                <Stack spacing={2}>
                    <Directory
                        hostOs={hostOs}
                        path={directory.path}
                        setPath={directory.setPath}
                        onClick={directory.selectDirectory}
                        error={directory.error}
                    />
                    <Extensions extensions={extensions} />
                    <Proxy
                        useProxy={proxy.useProxy}
                        setUseProxy={proxy.setUseProxy}
                        url={proxy.url}
                        setUrl={proxy.setUrl}
                        error={proxy.error}
                    />
                </Stack>
                {browsersync.status === "idle" &&
                    <Submit />
                }
            </Stack>
        </>
    );
}
