import { useEffect, useState, useRef } from "react";
import { listen } from "@tauri-apps/api/event";

export default function useLogStream() {
    const [lines, setLines] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unlisten = listen<string>("browsersync_log", (event) => {
            setLines((prev) => [...prev, event.payload]);
        });

        return () => {
            unlisten.then((f) => f());
        };
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [lines]);

    return {
        lines,
        setLines,
        containerRef
    }
}
