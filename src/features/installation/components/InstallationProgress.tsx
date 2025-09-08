import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

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

    const { t } = useTranslation();

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
                        {t("overlay.installation.title")}
                    </Typography>
                    <ProgressIcon size={80} status={status} />
                    <Typography variant="body1" sx={{ height: "3em", mb: 1, whiteSpace: "pre-line" }}>
                        {statusMessage && t(statusMessage.key, statusMessage.params)}
                    </Typography>
                    <TaskList groupedTaskStatuses={groupedTaskStatuses} />
                </FullscreenOverlay>
            )}
        </>
    );
};
