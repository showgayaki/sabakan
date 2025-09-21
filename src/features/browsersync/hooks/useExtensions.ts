import { useState, useEffect } from "react";
import type { ExtensionsStore } from "@/types/browsersyncForm";

const STORAGE_KEY = "sabakan.extensions";

export default function useExtensions(): ExtensionsStore {
    const [items, setItems] = useState<string[]>(() => {
        // 初回は localStorage から読み込む
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [".html", ".htm", ".css", ".js", ".php"];
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
