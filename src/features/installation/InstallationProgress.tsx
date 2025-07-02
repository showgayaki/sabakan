import { useEffect } from "react";
import { Typography } from "@mui/material";

import FullscreenCircularProgress from "@/components/FullscreenCircularProgress";
import TaskList from "@/components/TaskList";

import { INSTALL_TASKS } from "./constants";
import { useInstallationTasks } from "./hooks";

export default function InstallationProgress({ onComplete }: { onComplete: () => void }) {
    const {
        groupedTaskStatuses,
        currentTask,
        isInstalling,
        success,
    } = useInstallationTasks(INSTALL_TASKS);

    useEffect(() => {
        if (success && !isInstalling) {
            onComplete();
        }
    }, [success, isInstalling, onComplete]);

    return (
        <>
            {isInstalling && (
                <FullscreenCircularProgress success={success}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {currentTask ? `${currentTask} をインストール中です...` : "インストールが完了しました！"}
                    </Typography>
                    <TaskList groupedTaskStatuses={groupedTaskStatuses} />
                </FullscreenCircularProgress>
            )}
        </>
    );
};
