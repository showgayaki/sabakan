import { Stack } from "@mui/material";
import { StopCircle } from "@mui/icons-material";
import { QRCodeCanvas } from "qrcode.react";

import { BUTTON_FONT_SIZE } from "@/constants/ui";
import FullscreenOverlay from "@/components/FullscreenOverlay";
import CustomIconButton from "@/components/CustomIconButton";

import LogStream from "./LogStream";

interface LiveOverlayProps {
    url: string;
    logs: string[];
    logContainerRef: React.RefObject<HTMLDivElement>;
    handleStopBrowsersync: () => void;
}

export default function LiveOverlay({ url, logs, logContainerRef, handleStopBrowsersync }: LiveOverlayProps) {
    const QR_CODE_SIZE = 100;
    const LOG_STREAM_HEIGHT = `calc(100% - ${QR_CODE_SIZE}px)`;

    return (
        <FullscreenOverlay>
            <Stack
                spacing={1}
                alignItems="center"
                sx={{
                    width: "100%",
                    height: "100%",
                    py: 2,
                }}
            >
                <Stack
                    spacing={1.5}
                    alignItems="center"
                    sx={{
                        width: "100%",
                        height: `calc(100% - ${BUTTON_FONT_SIZE}px)`,
                    }}
                >
                    <QRCodeCanvas height={QR_CODE_SIZE} size={QR_CODE_SIZE} value={url} marginSize={2} />
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
