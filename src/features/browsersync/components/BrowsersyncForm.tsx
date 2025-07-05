import { Stack } from "@mui/material";

import useBrowsersyncForm from "../hooks/useBrowsersyncForm";
import DirectoryInputSection from "./DirectoryInputSection";
import ProxySection from "./ProxySection";
import ButtonSection from "./ButtonSection";
import BrowsersyncProgress from "./BrowsersyncProgress";
import QrCodeDialog from "./QrCodeDialog";

export default function BrowsersyncForm() {
    const {
        hostOs,
        directory,
        browsersync,
        useProxy,
        setUseProxy,
    } = useBrowsersyncForm();

    return (
        <>
            {browsersync.statusMessage &&
                <BrowsersyncProgress status={browsersync.status} statusMessage={browsersync.statusMessage} />
            }
            <QrCodeDialog
                open={browsersync.isShowQrCode}
                onClose={() => browsersync.setIsShowQrCode(false)}
                qrCodeUrl={browsersync.url}
            />
            <form>
                <Stack spacing={2} sx={{ mb: 2 }}>
                    <DirectoryInputSection
                        hostOs={hostOs}
                        path={directory.path}
                        setPath={directory.setPath}
                        onClick={directory.selectDirectory}
                        error={directory.error}
                    />
                    <ProxySection
                        useProxy={useProxy}
                        setUseProxy={setUseProxy}
                        proxy=""
                        setProxy={() => { }}
                        proxyError={null}
                    />
                </Stack>
                <ButtonSection
                    isRunning={browsersync.isRunning}
                    handleStartBrowsersync={() => {
                        if (directory.validate()) {
                            browsersync.handleStart(directory.path);
                        }
                    }}
                    handleStopBrowsersync={() => { browsersync.handleStop(); }}
                    handleShowQrCode={() => setIsShowQrCode(true)}
                />
            </form>
        </>
    );
}
