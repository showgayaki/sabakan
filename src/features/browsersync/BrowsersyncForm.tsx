import { Stack } from "@mui/material";

import useBrowsersyncForm from "./useBrowsersyncForm";
import DirectoryInputSection from "./components/DirectoryInputSection";
import ProxySection from "./components/ProxySection";
import ButtonSection from "./components/ButtonSection";
import BrowsersyncProgress from "./components/BrowsersyncProgress";
import QrCodeDialog from "./components/QrCodeDialog";

export default function BrowsersyncForm() {
    const {
        hostOs,
        directory,
        setDirectory,
        directoryError,
        isRunning,
        status,
        statusMessage,
        selectDirectory,
        handleStartBrowsersync,
        handleStopBrowsersync,
        url,
        isShowQrCode,
        setIsShowQrCode,
    } = useBrowsersyncForm();

    return (
        <>
            {statusMessage &&
                <BrowsersyncProgress status={status} statusMessage={statusMessage} />
            }
            <QrCodeDialog
                open={isShowQrCode}
                onClose={() => setIsShowQrCode(false)}
                qrCodeUrl={url}
            />
            <form>
                <Stack spacing={2} sx={{ mb: 2 }}>
                    <DirectoryInputSection
                        hostOs={hostOs}
                        path={directory}
                        setPath={setDirectory}
                        onClick={selectDirectory}
                        error={directoryError}
                    />
                    <ProxySection
                        useProxy={false}
                        setUseProxy={() => {}}
                        proxy=""
                        setProxy={() => {}}
                        proxyError={null}
                    />
                </Stack>
                <ButtonSection
                    isRunning={isRunning}
                    handleStartBrowsersync={() => { handleStartBrowsersync(directory); }}
                    handleStopBrowsersync={() => { handleStopBrowsersync(); }}
                    handleShowQrCode={() => setIsShowQrCode(true)}
                />
            </form>
        </>
    );
}
