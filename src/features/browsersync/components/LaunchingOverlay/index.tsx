import { Stack } from "@mui/material";
import { StopCircle } from "@mui/icons-material";

import { BUTTON_FONT_SIZE } from "@/constants/ui";
import CustomIconButton from "@/components/CustomIconButton";
import FullscreenOverlay from "@/components/FullscreenOverlay";
import type {
    BrowsersyncState,
    QrCodeState,
    LogStreemState,
} from "@/types/browsersyncForm";

import QrCode from "./QrCode";
import LogStream from "./LogStream";

interface LaunchingOverlayProps {
    browsersync: BrowsersyncState,
    qrCode: QrCodeState,
    logStream: LogStreemState,
}

export default function LaunchingOverlay({
    browsersync,
    qrCode,
    logStream,
}: LaunchingOverlayProps) {
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
                    <QrCode
                        browsersync={browsersync}
                        qrCode={qrCode}
                    />
                    <LogStream
                        logs={logStream.lines}
                        containerRef={logStream.containerRef}
                    />
                </Stack>
                <CustomIconButton
                    onClick={async () => {
                        console.log("Stop Browsersync clicked");
                        await browsersync.handleStop();
                        // LogStreamをクリア
                        logStream.setLines([]);
                    }}
                    icon={<StopCircle sx={{ fontSize: BUTTON_FONT_SIZE }} />}
                    disabled={browsersync.status !== "error" && browsersync.status !== "success"}
                />
            </Stack>
        </FullscreenOverlay>
    );
}
