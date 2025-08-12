import { useState, useEffect } from "react";
import { type } from "@tauri-apps/plugin-os";

import { AppContext } from "./context";

export default function AppProvider({ children }: { children: React.ReactNode }) {
    const [hostOs, setHostOs] = useState("");

    useEffect(() => {
        setHostOs(type());
    }, []);

    return (
        <AppContext.Provider value={{ hostOs }}>
            {children}
        </AppContext.Provider>
    );
}
