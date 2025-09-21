import { useState, useEffect } from "react";
import type { ExtensionsStore } from "@/types/browsersyncForm";

const STORAGE_KEY = "sabakan.extensions";

export default function useExtensions(): ExtensionsStore {
    const defaultExtensions = [".html", ".htm", ".css", ".js", ".php"];

    const [items, setItems] = useState<string[]>(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : defaultExtensions;
        } catch (err) {
            console.error("[useExtensions] Failed to read or parse localStorage:", err);
            return defaultExtensions;
        }
    });

    // items が変わったら localStorage に保存
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    return {
        items,
        setItems,
    };
}
