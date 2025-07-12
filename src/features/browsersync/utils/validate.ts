import { directoryExists } from "../api";

export async function validateDirectoryPath(
    path: string,
    hostOs: string
) : Promise<string | null> {
    if (!path) {
        return "ディレクトリを選択してください";
    }

    const pathRegex = (hostOs === "windows") ?
        /^[a-zA-Z]:\\(?:[\w\s-]+\\)*[\w\s-]+$/ :  // WindowsのパスはC:\path\to\directoryの形式
        /^\/(?:[\w\s-]+\/)*[\w\s-]+$/;  // macOSのパスは/path/to/directoryの形式

    if (!pathRegex.test(path)) {
        return "パス形式が正しくありません";
    }

    const doesExist = await directoryExists(path);
    if (!doesExist) {
        return "指定されたディレクトリが存在しません";
    }

    return null; // エラーなし
}

export function validateUrl(proxyUrl: string): string | null {
    if (!proxyUrl) {
        return "URLを入力してください";
    }

    const urlRegex = /^(http|https):\/\/[^\s/$.?#].[^\s]*$/;

    if (!urlRegex.test(proxyUrl)) {
        return "URLの形式が正しくありません";
    }

    return null; // エラーなし
}
