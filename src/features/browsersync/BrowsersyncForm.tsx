import useBrowsersyncForm from "./useBrowsersyncForm";

import DirectoryInputSection from "./components/DirectoryInputSection";
import ButtonSection from "./components/ButtonSection";
import BrowsersyncProgress from "./components/BrowsersyncProgress";

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
    } = useBrowsersyncForm();

    return (
        <>
            {statusMessage &&
                <BrowsersyncProgress status={status} statusMessage={statusMessage} />
            }
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
                    handleShowQrCode={() => { }}
                />
            </form>
        </>
    );
}
