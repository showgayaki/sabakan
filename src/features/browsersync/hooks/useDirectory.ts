import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";

import { useHostOs } from "@/config/context";
import { ERROR_DISPLAY_DURATION_MS } from "@/constants/ui";
import type { DirectoryParams } from "@/types/browsersyncForm";
import type { TranslationKeys } from "@/types/i18next";

import { validateDirectoryPath } from "../utils/validate";

export default function useBrowsersyncForm() {
    const hostOs = useHostOs();

    const [path, setPath] = useState<string>("");
    const [errorKey, setErrorKey] = useState<TranslationKeys | undefined>(undefined);

    const selectDirectory = async () => {
        console.log("Selecting directory...");
        const selected = await open({
            directory: true,
            multiple: false,
        });
        if (typeof selected === "string") {
            setPath(selected);
        }
    };

    const validate = async () => {
        const key = await validateDirectoryPath(path, hostOs);
        if (key) {
            console.log("Directory validation failed:", key);
            setErrorKey(key);

            setTimeout(() => {
                setErrorKey(undefined);
            }, ERROR_DISPLAY_DURATION_MS);
        }
        return key === undefined;
    };

    const params: DirectoryParams = {
        path,
        setPath,
        validate,
        onClick: selectDirectory,
        errorKey,
    };

    return params;
}