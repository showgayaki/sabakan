import { useEffect } from "react";
import { Typography } from "@mui/material";

import FullscreenOverlay from "@/components/FullscreenOverlay";
import ProgressIcon from "@/components/ProgressIcon";
import TaskList from "@/components/TaskList";

import { INSTALL_TASKS } from "../constants/tasks";
import { useInstallationProgress } from "../hooks/useInstallationProgress";

export default function InstallationProgress({ onComplete }: { onComplete: () => void }) {
    const {
        groupedTaskStatuses,
        isInstalling,
        status,
        statusMessage,
    } = useInstallationProgress(INSTALL_TASKS);

    useEffect(() => {
        if (status == "success" && !isInstalling) {
            onComplete();
        }
    }, [status, isInstalling, onComplete]);

    return (
        <>
            {isInstalling && (
                <FullscreenOverlay>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        初回セットアップを行っています
                    </Typography>
                    <ProgressIcon size={80} status={status} />
                    <Typography variant="body1" sx={{ height: "3em", mb: 1, whiteSpace: "pre-line" }}>
                        {statusMessage}
                    </Typography>
                    <TaskList groupedTaskStatuses={groupedTaskStatuses} />
                </FullscreenOverlay>
            )}
        </>
    );
};
