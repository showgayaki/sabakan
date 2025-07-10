import { useState, useEffect, useRef } from "react";

import type { GroupedTaskStatuses } from "@/types/taskStatuses";
import { ProgressStatus } from "@/types/progress";
import { delayMs } from "@/utils/delay";

import { checkInstalledBinaries, installTask } from "../api";

export function useInstallationProgress(tasks: { key: string; label: string }[]) {
    const [groupedTaskStatuses, setGroupedTaskStatuses] = useState<GroupedTaskStatuses>(() =>
        ({ Installation: Object.fromEntries(tasks.map((label) => [label.label, "pending"])) })
    );
    const [isInstalling, setIsInstalling] = useState(false);
    const [status, setStatus] = useState<ProgressStatus>("idle");
    const [statusMessage, setStatusMessage] = useState<string>("");
    const isExecuted = useRef(false); // StrictMode（開発時）での2回実行を回避

    const check = async () => {
        if (isExecuted.current) return;
        isExecuted.current = true;

        setStatus("pending");
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
                setIsInstalling(true);
            } else {
                setStatus("success");
            }
        } catch (error) {
            console.error("Error checking installed binaries:", error);
            setStatus("error");
        }
    };

    const installBinaries = async () => {
        for (const task of tasks) {
            if (groupedTaskStatuses.Installation[task.label] !== "pending") continue;
            await delayMs(200);
            setStatusMessage(`${task.label}をインストールしています...`)
            try {
                await installTask(task.key);
                setGroupedTaskStatuses(prev => ({ Installation: { ...prev.Installation, [task.label]: "success" } }));
                await delayMs(100);
            } catch (error) {
                console.error(`Error in ${task.key}:`, error);
                setStatus("error");
                setStatusMessage(`${task.label}のインストールに失敗しました😰\nアプリを再起動してみてください`)
                setGroupedTaskStatuses(prev => ({ Installation: { ...prev.Installation, [task.label]: "error" } }));
                return;
            }
        }

        setStatus("success");
        setStatusMessage("インストールが完了しました！");
        await delayMs(3000);
        setIsInstalling(false);
        setStatus("idle");
    };

    useEffect(() => {
        check();
    }, []);

    useEffect(() => {
        if (isInstalling) {
            installBinaries();
        }
    }, [isInstalling]);

    return {
        groupedTaskStatuses,
        isInstalling,
        status,
        statusMessage,
    };
}
