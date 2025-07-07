import { useEffect } from "react";
import { Typography } from "@mui/material";

import FullscreenCircularProgress from "@/components/FullscreenCircularProgress";
import TaskList from "@/components/TaskList";

import { INSTALL_TASKS } from "../constants/tasks";
import { useInstallationProgress } from "../hooks/useInstallationProgress";

export default function InstallationProgress({ onComplete }: { onComplete: () => void }) {
    const {
        groupedTaskStatuses,
        currentTask,
        isInstalling,
        status,
    } = useInstallationProgress(INSTALL_TASKS);

    useEffect(() => {
        if (status == "success" && !isInstalling) {
            onComplete();
        }
    }, [status, isInstalling, onComplete]);

    return (
        <>
            {isInstalling && (
                <FullscreenCircularProgress status={status}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {currentTask ? `${currentTask} をインストール中です...` : "インストールが完了しました！"}
                    </Typography>
                    <TaskList groupedTaskStatuses={groupedTaskStatuses} />
                </FullscreenCircularProgress>
            )}
        </>
    );
};
