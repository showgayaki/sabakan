import { useState } from "react";

import InstallationProgress from "@/features/installation/InstallationProgress";

export const AppInitializer = () => {
    const [installComplete, setInstallComplete] = useState(false);

    return (
        <>
            {!installComplete && <InstallationProgress onComplete={() => setInstallComplete(true)} />}
        </>
    );
};
