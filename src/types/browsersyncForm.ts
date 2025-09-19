import type { BrowsersyncParams } from "@/types/browsersyncParams";
import type { TranslationKeys } from "@/types/i18next";
import type { ProgressStatus } from "@/types/progress";

export type DirectoryParams = {
    path: string,
    setPath: (path: string) => void,
    validate: () => Promise<boolean>,
    onClick: () => Promise<void>,
    errorKey: TranslationKeys | undefined,
}

export type ExtensionsParams = {
    items: string[],
    setItems: (items: string[]) => void,
}

export type ProxyParams = {
    useProxy: boolean,
    setUseProxy: (useProxy: boolean) => void,
    url: string,
    setUrl: (url: string) => void,
    errorKey: TranslationKeys | undefined,
}

export type BrowsersyncState = {
    isRunning: boolean,
    status: ProgressStatus,
    statusMessage: TranslationKeys | undefined,
    handleStart: (params: BrowsersyncParams) => Promise<void>,
    handleStop: () => Promise <void>
    url: string,
};

export type QrCodeState = {
    canvasRef: React.RefObject<HTMLCanvasElement>,
    copyQrImage: () => void,
    copiedQr: TranslationKeys | undefined,
    copyUrl: (url: string) => void,
    copiedUrl: TranslationKeys | undefined,
}

export type LogStreemState = {
    lines: string[],
    setLines: (lines: string[]) => void,
    containerRef: React.RefObject<HTMLDivElement>,
}