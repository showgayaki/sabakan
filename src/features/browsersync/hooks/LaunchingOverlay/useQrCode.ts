import { useState, useRef } from "react";
import { Image } from "@tauri-apps/api/image";
import { writeImage, writeText } from "@tauri-apps/plugin-clipboard-manager";

import { MESSAGE_DISPLAY_DURATION_MS } from "@/constants/ui"
import type { TranslationKeys } from "@/types/i18next";
import type { QrCodeState } from "@/types/browsersyncForm";

export default function useQrCode(): QrCodeState {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [copiedQr, setCopiedQr] = useState<TranslationKeys | undefined>(undefined);
    const [copiedUrl, setCopiedUrl] = useState<TranslationKeys | undefined>(undefined);

    const copyQrImage = async () => {
        setCopiedQr(undefined);
        const canvas = canvasRef.current;
        if (!canvas) return;

        try {
            const { width, height } = canvas;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const { data } = ctx.getImageData(0, 0, width, height);
            const buffer = new Uint8Array(data);
            console.log("buffer:", buffer);

            const image = await Image.new(buffer, width, height);
            await writeImage(image);
            console.log("QR code image copied to clipboard");
            setCopiedQr("clipboard.copySuccess");
        } catch (err) {
            console.error("Failed to copy QR code image:", err);
            setCopiedQr("clipboard.copyError");
        }

        setTimeout(() => {
            setCopiedQr(undefined);
        }, MESSAGE_DISPLAY_DURATION_MS);
    };

    const copyUrl = async (url: string) => {
        setCopiedUrl(undefined);
        try {
            await writeText(url);
            setCopiedUrl("clipboard.copySuccess");
        } catch (err) {
            console.error("Failed to copy URL:", err);
            setCopiedUrl("clipboard.copyError");
        }

        setTimeout(() => {
            setCopiedUrl(undefined);
        }, MESSAGE_DISPLAY_DURATION_MS);
    };

    return {
        canvasRef,
        copyQrImage,
        copiedQr,
        copyUrl,
        copiedUrl,
    }
}
