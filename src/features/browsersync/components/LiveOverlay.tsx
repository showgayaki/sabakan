import { Stack, Box } from "@mui/material";
import { StopCircle } from "@mui/icons-material";
import { QRCodeCanvas } from "qrcode.react";

import { BUTTON_FONT_SIZE } from "@/constants/ui";
import FullscreenOverlay from "@/components/FullscreenOverlay";
import CustomIconButton from "@/components/CustomIconButton";

import LogStream from "./LogStream";

interface LiveOverlayProps {
    url: string;
    handleStopBrowsersync: () => void;
}

export default function LiveOverlay({ url, handleStopBrowsersync }: LiveOverlayProps) {
    const qrCodeSize = 100;

    return (
        <FullscreenOverlay>
            <Stack
                spacing={1}
                justifyContent="cemter"
                alignItems="center"
                sx={{
                    width: "100%",
                    height: "100%",
                    my: 2,
                }}
            >
                <Stack
                    spacing={1.5}
                    // direction="column"
                    // justifyContent="cemter"
                    alignItems="center"
                    sx={{
                        flexGrow: 1,
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    <QRCodeCanvas size={qrCodeSize} value={url} marginSize={2} />
                    <LogStream log={`Live URL: ${url}`} />
                </Stack>
                <Box sx={{ flexShrink: 0 }}>
                    <CustomIconButton
                        onClick={() => {
                            console.log("Stop Browsersync clicked");
                            handleStopBrowsersync();
                        }}
                        icon={<StopCircle sx={{ fontSize: BUTTON_FONT_SIZE }} />}
                    />
                </Box>
            </Stack>
        </FullscreenOverlay>
    );
}
