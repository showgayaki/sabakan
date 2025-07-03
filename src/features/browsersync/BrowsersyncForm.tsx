import useBrowsersyncForm from "./useBrowsersyncForm";

import DirectoryInputSection from "./components/DirectoryInputSection";
import ButtonSection from "./components/ButtonSection";

export default function BrowsersyncForm() {
    const {
        hostOs,
        directory,
        setDirectory,
        selectDirectory,
        startBrowsersync,
        stopBrowsersync,
        isRunning,
        setIsRunning,
    } = useBrowsersyncForm();

    return (
        <>
            <form className="space-y-4">
                <DirectoryInputSection
                    hostOs={hostOs}
                    path={directory}
                    setPath={setDirectory}
                    onClick={selectDirectory}
                    error={null}
                />
                <ButtonSection
                    isRunning={isRunning}
                    handleStartBrowsersync={() => {
                        setIsRunning(true);
                        startBrowsersync(directory);
                    }}
                    handleStopBrowsersync={() => {
                        setIsRunning(false);
                        stopBrowsersync();
                    }}
                    handleShowQrCode={() => {}}
                />
            </form>
        </>
    );
}
