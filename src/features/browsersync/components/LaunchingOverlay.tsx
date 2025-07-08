import { Stack, Typography } from "@mui/material";
import { StopCircle } from "@mui/icons-material";
import { QRCodeCanvas } from "qrcode.react";

import { BUTTON_FONT_SIZE } from "@/constants/ui";
import CustomIconButton from "@/components/CustomIconButton";
import FullscreenOverlay from "@/components/FullscreenOverlay";
import ProgressIcon from "@/components/ProgressIcon";
import { ProgressStatus } from "@/types/progress";

import LogStream from "./LogStream";

interface LaunchingOverlayProps {
    status: ProgressStatus;
    statusMessage?: string;
    isRunning: boolean;
    url: string;
    logs: string[];
    logContainerRef: React.RefObject<HTMLDivElement>;
    handleStopBrowsersync: () => void;
}

export default function LaunchingOverlay({
    status,
    statusMessage,
    isRunning,
    url,
    logs,
    logContainerRef,
    handleStopBrowsersync,
}: LaunchingOverlayProps) {
    const QR_CODE_SIZE = 100;
    const LOG_STREAM_HEIGHT = `calc(100% - ${QR_CODE_SIZE}px)`;

    const SPACING_1_HEIGHT = 8;
    const STATUS_MESSAGE_HEIGHT = 32 + SPACING_1_HEIGHT;
    const PROGRESS_ICON_SIZE = QR_CODE_SIZE - STATUS_MESSAGE_HEIGHT;

    return (
        <FullscreenOverlay>
            <Stack
                spacing={1.5}
                alignItems="center"
                sx={{
                    width: "100%",
                    height: "100%",
                    p: 2,
                }}
            >
                <Stack
                    spacing={1}
                    alignItems="center"
                    sx={{
                        width: "100%",
                        height: `calc(100% - ${BUTTON_FONT_SIZE}px)`,
                    }}
                >
                    {
                        isRunning ?
                            <QRCodeCanvas
                                height={QR_CODE_SIZE}
                                size={QR_CODE_SIZE}
                                value={url}
                                marginSize={2}
                            />
                            :
                            <Progress
                                status={status}
                                iconSize={PROGRESS_ICON_SIZE}
                                statusMessage={statusMessage}
                            />
                    }
                    <LogStream
                        height={LOG_STREAM_HEIGHT}
                        logs={logs}
                        containerRef={logContainerRef}
                    />
                </Stack>
                <CustomIconButton
                    onClick={() => {
                        console.log("Stop Browsersync clicked");
                        handleStopBrowsersync();
                    }}
                    icon={<StopCircle sx={{ fontSize: BUTTON_FONT_SIZE }} />}
                />
            </Stack>
        </FullscreenOverlay>
    );
}

interface ProgressProps {
    status: ProgressStatus;
    iconSize: number;
    statusMessage?: string;
}

function Progress({ status, iconSize, statusMessage }: ProgressProps) {
    return (
        <Stack
            spacing={1}
            alignItems="center"
            sx={{
                width: "100%",
            }}
        >
            <ProgressIcon
                size={iconSize}
                status={status}
            />
            <Typography variant="h6">
                {statusMessage}
            </Typography>
        </Stack>
    );
}
