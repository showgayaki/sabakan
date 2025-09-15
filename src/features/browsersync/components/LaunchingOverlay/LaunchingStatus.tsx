import { useRef } from "react";
import { Image } from "@tauri-apps/api/image";
import { writeImage } from "@tauri-apps/plugin-clipboard-manager";
import { useTranslation } from "react-i18next";
import { QRCodeCanvas } from "qrcode.react";

import { Stack, Typography, Tooltip, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import ProgressIcon from "@/components/ProgressIcon";
import type { TranslationKeys } from "@/types/i18next";
import type { ProgressStatus } from "@/types/progress";

interface LaunchingStatusProps {
    isRunning: boolean;
    url: string;
    status: ProgressStatus;
    statusMessage?: TranslationKeys;
    qrCodeSize: number;
    progressIconSize: number;
}

export default function LaunchingStatus({
    isRunning,
    url,
    status,
    statusMessage,
    qrCodeSize,
    progressIconSize,
}: LaunchingStatusProps) {
    const { t } = useTranslation();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const copyQrImage = async () => {
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
        } catch (err) {
            console.error("Failed to copy QR code image:", err);
        }
    };

    if (isRunning) {
        return (
            <Stack spacing={1} alignItems="center">
                <QRCodeCanvas
                    ref={canvasRef}
                    height={qrCodeSize}
                    size={qrCodeSize}
                    value={url}
                    marginSize={2}
                />
                <Tooltip title="Copy QR code image">
                    <IconButton onClick={copyQrImage}>
                        <ContentCopyIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        );
    }

    return (
        <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
            <ProgressIcon size={progressIconSize} status={status} />
            <Typography variant="h6">
                {statusMessage && t(statusMessage)}
            </Typography>
        </Stack>
    );
}