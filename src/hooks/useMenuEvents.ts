import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listen } from "@tauri-apps/api/event";
import { openUrl } from '@tauri-apps/plugin-opener';

import { REPOSITORY_URL } from "@/constants/urls";

export function useMenuEvents() {
    const navigate = useNavigate();

    useEffect(() => {
        const setup = async () => {
            const unlistenLicense = await listen("show_license", () => {
                navigate("/license");
            });
            const unlistenHelp = await listen("show_help", () => {
                openUrl(REPOSITORY_URL);
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
