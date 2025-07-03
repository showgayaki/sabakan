import DirectoryInputSection from "./components/DirectoryInputSection";
import useBrowsersyncForm from "./useBrowsersyncForm";

export default function BrowsersyncForm() {
    const { hostOs, directory, setDirectory, selectDirectory } = useBrowsersyncForm();

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
            </form>
        </>
    );
}
