import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listen } from "@tauri-apps/api/event";

import { type Hamburger } from "./useHamburger";

interface MenuEventsProps {
    hamburger: Hamburger;
};

export function useMenuEvents({ hamburger }: MenuEventsProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const setup = async () => {
            // Rustからのemitをリッスン
            const unlistenLicense = await listen("open_license", () => {
                hamburger.openLicense();
            });
            const unlistenHelp = await listen("open_help", () => {
                hamburger.openHelp();
            });

            return () => {
                unlistenLicense();
                unlistenHelp();
            };
        };

        const cleanup = setup();
        return () => {
            cleanup.then((f) => f());
        };
    }, [navigate]);
}
