import { useState } from "react";

import InstallationProgress from "./components/InstallationProgress";

export default function WindowsSetup() {
    const [installComplete, setInstallComplete] = useState(false);

    return (
        <>
            {!installComplete && <InstallationProgress onComplete={() => setInstallComplete(true)} />}
        </>
    );
};
