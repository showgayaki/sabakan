import type { TranslationKeys } from "@/types/i18next";
import { directoryExists } from "../api";

export async function validateDirectoryPath(path: string, hostOs: string) : Promise<TranslationKeys | undefined> {
    if (!path) {
        return "validation.directory.empty";
    }

    const pathRegex = (hostOs === "windows") ?
        /^[a-zA-Z]:\\(?:[\w\s\-\.]+\\)*[\w\s\-\.]+$/ :  // WindowsのパスはC:\path\to\directoryの形式
        /^\/(?:[\w\s\-\.]+\/)*[\w\s\-\.]+$/;  // macOSのパスは/path/to/directoryの形式

    if (!pathRegex.test(path)) {
        return "validation.directory.invalid";
    }

    const doesExist = await directoryExists(path);
    if (!doesExist) {
        return "validation.directory.notFound";
    }

    return undefined; // エラーなし
}

export function validateUrl(proxyUrl: string): TranslationKeys | undefined {
    if (!proxyUrl) {
        return "validation.url.empty";
    }

    const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;

    if (!urlRegex.test(proxyUrl)) {
        return "validation.url.invalid";
    }

    return undefined; // エラーなし
}
