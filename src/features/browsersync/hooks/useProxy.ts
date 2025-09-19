import { useState } from "react";

import { ERROR_DISPLAY_DURATION_MS } from "@/constants/ui";
import type { TranslationKeys } from "@/types/i18next";

import { validateUrl } from "../utils/validate";

export default function useProxy() {
    const [useProxy, setUseProxy] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    const [errorKey, setErrorKey] = useState<TranslationKeys | undefined>(undefined);

    const validate =() => {
        // Proxyを使用するチェックボックスがオフの場合はバリデーションをスキップ
        if (!useProxy) {
            return true;
        }

        const message = validateUrl(url);
        if (message) {
            console.error("Proxy URL validation failed:", message);
            setErrorKey(message);

            setTimeout(() => {
                setErrorKey(undefined);
            }, ERROR_DISPLAY_DURATION_MS);

            return false;
        }
        return message === undefined;
    }

    return {
        useProxy,
        setUseProxy,
        url,
        setUrl,
        validate,
        errorKey,
    }
}
