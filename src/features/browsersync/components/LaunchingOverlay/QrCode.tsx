import { IconButton, Stack, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import { QRCodeCanvas } from "qrcode.react";

import { CopyResultTooltip } from "@/components/CustomTooltips";
import ProgressIcon from "@/components/ProgressIcon";
import type { BrowsersyncState, QrCodeState } from "@/types/browsersyncForm";

interface QrCodeProps {
    browsersync: BrowsersyncState,
    qrCode: QrCodeState,
}

export default function QrCode({ browsersync, qrCode }: QrCodeProps) {
    const { isRunning, url, status, statusMessage } = browsersync;
    const { canvasRef, copyQrImage, copied } = qrCode;
    const { t } = useTranslation();

    const qrCodeSize = 120;
    const stackSpacingPx = 8; // 8px: spacing={1}の高さ
    const statusMessageHeight = 32 + stackSpacingPx; // 32px: 文字の高さ
    const progressIconSize = qrCodeSize - statusMessageHeight;

    const copyButtonClass = "copy-btn";
    const copyIconSize = 42;

    if (isRunning) {
        return (
            <Stack
                alignItems="center"
                sx={{
                    position: "relative",
                    [`&:hover .${copyButtonClass}`]: {
                        opacity: 1,
                        bgcolor: "rgba(0, 0, 0, 0.7)",
                        borderRadius: 0,
                    },
                }}
            >
                <QRCodeCanvas
                    ref={canvasRef}
                    height={qrCodeSize}
                    size={qrCodeSize}
                    value={url}
                    marginSize={2}
                />
                <CopyResultTooltip
                    title={copied ? t(copied) : ""}
                    placement="bottom"
                >
                    <IconButton
                        className={copyButtonClass}
                        onClick={copyQrImage}
                        sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            opacity: 0,
                            transition: "opacity 0.3s",
                        }}
                    >
                        <ContentCopyIcon sx={{ fontSize: copyIconSize }} />
                    </IconButton>
                </CopyResultTooltip>
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
