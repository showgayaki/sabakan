import useBrowsersyncForm from "./useBrowsersyncForm";

import DirectoryInputSection from "./components/DirectoryInputSection";
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
            <form className="space-y-4">
                <DirectoryInputSection
                    hostOs={hostOs}
                    path={directory}
                    setPath={setDirectory}
                    onClick={selectDirectory}
                    error={directoryError}
                />
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
