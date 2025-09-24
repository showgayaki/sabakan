import { Stack } from "@mui/material";
import { StopCircle } from "@mui/icons-material";

import { BUTTON_FONT_SIZE, BUTTON_MARGIN_SCALE } from "@/constants/ui";
import { CircleIconButton } from "@/components/CustomIconButton";
import FullscreenOverlay from "@/components/FullscreenOverlay";
import type {
    BrowsersyncStore,
    QrCodeStore,
    LogStreemStore,
} from "@/types/browsersyncForm";

import QrCode from "./QrCode";
import LogStream from "./LogStream";

interface LaunchingOverlayProps {
    browsersync: BrowsersyncStore,
    qrCode: QrCodeStore,
    logStream: LogStreemStore,
}

export default function LaunchingOverlay({
    browsersync,
    qrCode,
    logStream,
}: LaunchingOverlayProps) {
    return (
        <FullscreenOverlay>
            <Stack
                spacing={BUTTON_MARGIN_SCALE}
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
                    sx={(theme) => ({
                        width: "100%",
                        height: `calc(100% - ${BUTTON_FONT_SIZE}px - ${theme.spacing(BUTTON_MARGIN_SCALE)})`,
                    })}
                >
                    <QrCode
                        browsersync={browsersync}
                        qrCode={qrCode}
                    />
                    <LogStream
                        logs={logStream.lines}
                        containerRef={logStream.containerRef}
                    />
                </Stack>
                <CircleIconButton
                    icon={<StopCircle sx={{ fontSize: BUTTON_FONT_SIZE }} />}
                    onClick={async () => {
                        console.log("Stop Browsersync clicked");
                        await browsersync.handleStop();
                        // LogStreamをクリア
                        logStream.setLines([]);
                    }}
                    disabled={browsersync.status !== "error" && browsersync.status !== "success"}
                />
            </Stack>
        </FullscreenOverlay>
    );
}
