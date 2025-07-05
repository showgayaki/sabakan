export function validateDirectoryPath(path: string, hostOs: string): string | null {
    if (!path) {
        return "ディレクトリを選択してください";
    }

    const pathRegex = (hostOs === "windows") ?
        /^[a-zA-Z]:\\(?:[\w\s-]+\\)*[\w\s-]+$/ :  // WindowsのパスはC:\path\to\directoryの形式
        /^\/(?:[\w\s-]+\/)*[\w\s-]+$/;  // macOSのパスは/path/to/directoryの形式

    if (!pathRegex.test(path)) {
        return "パス形式が正しくありません";
    }

    return null; // エラーなし
}
