import type { BrowsersyncParams } from "@/types/browsersyncParams";
import type { TranslationKeys } from "@/types/i18next";
import type { ProgressStatus } from "@/types/progress";

export type DirectoryStore = {
    path: string,
    setPath: (path: string) => void,
    validate: () => Promise<boolean>,
    onClick: () => Promise<void>,
    errorKey: TranslationKeys | undefined,
}

export type ExtensionsStore = {
    items: string[],
    setItems: (items: string[]) => void,
}

export type ProxyStore = {
    useProxy: boolean,
    setUseProxy: (useProxy: boolean) => void,
    url: string,
    setUrl: (url: string) => void,
    validate: () => void,
    errorKey: TranslationKeys | undefined,
}

export type SyncStore = {}

export type BrowsersyncStore = {
    isRunning: boolean,
    status: ProgressStatus,
    statusMessage: TranslationKeys | undefined,
    handleStart: (params: BrowsersyncParams) => Promise<void>,
    handleStop: () => Promise <void>
    url: string,
};

export type QrCodeStore = {
    canvasRef: React.RefObject<HTMLCanvasElement>,
    copyQrImage: () => void,
    copiedQr: TranslationKeys | undefined,
    copyUrl: (url: string) => void,
    copiedUrl: TranslationKeys | undefined,
}

export type LogStreemStore = {
    lines: string[],
    setLines: (lines: string[]) => void,
    containerRef: React.RefObject<HTMLDivElement>,
}