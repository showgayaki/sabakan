import { Stack } from "@mui/material";

import useBrowsersyncForm from "../hooks/useBrowsersyncForm";
import DirectoryInputSection from "./DirectoryInputSection";
import ProxySection from "./ProxySection";
import ButtonSection from "./ButtonSection";
import LaunchingOverlay from "./LaunchingOverlay";

export default function BrowsersyncForm() {
    const {
        hostOs,
        directory,
        browsersync,
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
                    handleStopBrowsersync={() => {
                        logStream.setLines([]);
                        browsersync.handleStop();
                    }}
                />
            }
            <Stack
                component="form"
                justifyContent="space-between"
                onSubmit={handleSubmit}
                sx={{
                    height: "100%",
                }}
            >
                <Stack spacing={2}>
                    <DirectoryInputSection
                        hostOs={hostOs}
                        path={directory.path}
                        setPath={directory.setPath}
                        onClick={directory.selectDirectory}
                        error={directory.error}
                    />
                    <ProxySection
                        useProxy={proxy.useProxy}
                        setUseProxy={proxy.setUseProxy}
                        url={proxy.url}
                        setUrl={proxy.setUrl}
                        error={proxy.error}
                    />
                </Stack>
                {browsersync.status === "idle" &&
                    <ButtonSection />
                }
            </Stack>
        </>
    );
}
