import { Stack } from "@mui/material";
import { StopCircle } from "@mui/icons-material";

import { BUTTON_FONT_SIZE } from "@/constants/ui";
import CustomIconButton from "@/components/CustomIconButton";
import FullscreenOverlay from "@/components/FullscreenOverlay";
import type { TranslationKeys } from "@/types/i18next";
import type { ProgressStatus } from "@/types/progress";

import LaunchingStatus from "./LaunchingStatus";
import LogStream from "./LogStream";

interface LaunchingOverlayProps {
    status: ProgressStatus;
    statusMessage?: TranslationKeys;
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
    const QR_CODE_SIZE = 120;
    const SPACING_1_HEIGHT = 8;
    const STATUS_MESSAGE_HEIGHT = 32 + SPACING_1_HEIGHT;  // 32px: 文字の高さ, 8px: spacing={1}の高さ
    const PROGRESS_ICON_SIZE = QR_CODE_SIZE - STATUS_MESSAGE_HEIGHT;

    return (
        <FullscreenOverlay>
            <Stack
                spacing={1}
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
                    <LaunchingStatus
                        isRunning={isRunning}
                        url={url}
                        status={status}
                        statusMessage={statusMessage}
                        qrCodeSize={QR_CODE_SIZE}
                        progressIconSize={PROGRESS_ICON_SIZE}
                    />
                    <LogStream
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
                    disabled={status !== "error" && status !== "success"}
                />
            </Stack>
        </FullscreenOverlay>
    );
}
