import { useState, useEffect, useRef } from "react";

import type { GroupedTaskStatuses } from "@/types/taskStatuses";

import { checkInstalledBinaries, installTask } from "./api";
import { delay } from "./utils";

export function useInstallationTasks(tasks: { key: string; label: string }[]) {
    const [groupedTaskStatuses, setGroupedTaskStatuses] = useState<GroupedTaskStatuses>(() =>
        ({ Installation: Object.fromEntries(tasks.map((label) => [label.label, "pending"])) })
    );
    const [currentTask, setCurrentTask] = useState<string | null>(null);
    const [isInstalling, setIsInstalling] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showDependenciesAlert, setShowDependenciesAlert] = useState(false);
    const isExecuted = useRef(false); // StrictMode（開発時）での2回実行を回避

    const check = async () => {
        if (isExecuted.current) return;
        isExecuted.current = true;

        try {
            const installed = await checkInstalledBinaries();
            setGroupedTaskStatuses(
                {
                    Installation: Object.fromEntries(tasks.map(
                        (task) => [task.label, installed.includes(task.label) ? "success" : "pending"]
                    ))
                }
            );

            const missing = tasks.filter(task => !installed.includes(task.label));
            if (missing.length > 0) {
                setCurrentTask(missing[0].label);
                setIsInstalling(true);
            } else {
                setShowDependenciesAlert(true);
                setSuccess(true);
            }
        } catch (error) {
            console.error("Error checking installed binaries:", error);
        }
    };

    const installedBinaries = async () => {
        for (const task of tasks) {
            if (groupedTaskStatuses.Installation[task.label] !== "pending") continue;
            setCurrentTask(task.label);
            await delay(100);
            try {
                await installTask(task.key);
                setGroupedTaskStatuses(prev => ({ Installation: { ...prev.Installation, [task.label]: "success" } }));
                await delay(100);
            } catch (error) {
                console.error(`Error in ${task.key}:`, error);
                setGroupedTaskStatuses(prev => ({ Installation: { ...prev.Installation, [task.label]: "error" } }));
                break;
            }
        }

        setSuccess(true);
        setCurrentTask(null);
        await delay(3000);
        setIsInstalling(false);
        setShowDependenciesAlert(true);
    };

    useEffect(() => {
        check();
    }, []);

    useEffect(() => {
        if (isInstalling) {
            installedBinaries();
        }
    }, [isInstalling]);

    return {
        groupedTaskStatuses,
        currentTask,
        isInstalling,
        success,
        showDependenciesAlert,
    };
}
