import { useState } from "react";

import { ERROR_DISPLAY_DURATION_MS } from "@/constants/ui";
import { validateUrl } from "../utils/validate";


export default function useProxy() {
    const [useProxy, setUseProxy] = useState<boolean>(false);
    const [url, setUrl] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const validate =() => {
        // Proxyを使用するチェックボックスがオフの場合はバリデーションをスキップ
        if (!useProxy) {
            return true;
        }

        const message = validateUrl(url);
        if (message) {
            console.error("Proxy URL validation failed:", message);
            setError(message);

            setTimeout(() => {
                setError(null);
            }, ERROR_DISPLAY_DURATION_MS);

            return false;
        }
        return message === null;
    }

    return {
        useProxy,
        setUseProxy,
        url,
        setUrl,
        validate,
        error,
    }
}
