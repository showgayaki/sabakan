import { Stack, Typography } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { useTranslation } from "react-i18next";

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

    return (
        isRunning ? (
            <QRCodeCanvas
                height={qrCodeSize}
                size={qrCodeSize}
                value={url}
                marginSize={2}
            />
        ) : (
            <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
                <ProgressIcon size={progressIconSize} status={status} />
                <Typography variant="h6">
                    {statusMessage && t(statusMessage)}
                </Typography>
            </Stack>
        )
    );
}
