import { Stack, Typography, Tooltip, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import { QRCodeCanvas } from "qrcode.react";

import ProgressIcon from "@/components/ProgressIcon";
import type { BrowsersyncState, QrCodeState } from "@/types/browsersyncForm";

interface QrCodeProps {
    browsersync: BrowsersyncState,
    qrCode: QrCodeState,
}

export default function QrCode({ browsersync, qrCode }: QrCodeProps) {
    const { t } = useTranslation();
    const { isRunning, url, status, statusMessage } = browsersync;
    const { canvasRef, copyQrImage } = qrCode;

    const QR_CODE_SIZE = 120;
    const SPACING_1_HEIGHT = 8;
    const STATUS_MESSAGE_HEIGHT = 32 + SPACING_1_HEIGHT;  // 32px: 文字の高さ, 8px: spacing={1}の高さ
    const PROGRESS_ICON_SIZE = QR_CODE_SIZE - STATUS_MESSAGE_HEIGHT;

    if (isRunning) {
        return (
            <Stack spacing={1} alignItems="center">
                <QRCodeCanvas
                    ref={canvasRef}
                    height={QR_CODE_SIZE}
                    size={QR_CODE_SIZE}
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
            <ProgressIcon size={PROGRESS_ICON_SIZE} status={status} />
            <Typography variant="h6">
                {statusMessage && t(statusMessage)}
            </Typography>
        </Stack>
    );
}