import useBrowsersyncForm from "./useBrowsersyncForm";

import DirectoryInputSection from "./components/DirectoryInputSection";
import ButtonSection from "./components/ButtonSection";

export default function BrowsersyncForm() {
    const {
        hostOs,
        directory,
        setDirectory,
        selectDirectory,
        directoryError,
        validate,
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
                    error={directoryError}
                />
                <ButtonSection
                    isRunning={isRunning}
                    handleStartBrowsersync={() => {
                        if (!validate()) {
                            console.error("Validation failed, cannot start Browsersync.");
                            return;
                        }
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
