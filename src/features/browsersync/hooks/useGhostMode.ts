import { useState, useCallback, useEffect } from "react";
import type { GhostModeStore } from "@/types/browsersyncForm";

const STORAGE_KEY = "sabakan.sync";

export default function useGhostMode(): GhostModeStore {
    // 初期値を localStorage から読み込む
    const getInitial = () => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return JSON.parse(saved) as Omit<GhostModeStore, "toggleEnabled">;
        } catch (err) {
            console.error("[useSync] Failed to read or parse localStorage:", err);
        }
        // デフォルト値
        return {
            enabled: true,
            scroll: true,
            clicks: true,
            forms: true,
        };
    };

    const initial = getInitial();

    const [enabled, setEnabled] = useState<boolean>(initial.enabled);
    const [scroll, setScroll] = useState<boolean>(initial.scroll);
    const [clicks, setClicks] = useState<boolean>(initial.clicks);
    const [forms, setForms] = useState<boolean>(initial.forms);

    const toggleEnabled = useCallback((value: boolean) => {
        setEnabled(value);
        if (value) {
            setScroll(true);
            setClicks(true);
            setForms(true);
        } else {
            setScroll(false);
            setClicks(false);
            setForms(false);
        }
    }, []);

    // どれかが変わったら保存
    useEffect(() => {
        const state = { enabled, scroll, clicks, forms };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (err) {
            console.error("[useSync] Failed to write localStorage:", err);
        }
    }, [enabled, scroll, clicks, forms]);

    useEffect(() => {
        // 4つがすべて false なら自動的に enabled を false に
        if (!scroll && !clicks && !forms) {
            setEnabled(false);
        }
    }, [scroll, clicks, forms]);

    return {
        enabled,
        toggleEnabled,
        scroll,
        setScroll,
        clicks,
        setClicks,
        forms,
        setForms,
    };
}
