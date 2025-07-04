import { Stack } from "@mui/material";
import { PlayCircle, StopCircle, QrCode } from "@mui/icons-material";

import CustomIconButton from "@/components/CustomIconButton";

interface ButtonSectionProps {
    isRunning: boolean;
    handleStartBrowsersync: () => void;
    handleStopBrowsersync: () => void;
    handleShowQrCode: () => void;
}

export default function ButtonSection({
    isRunning,
    handleStartBrowsersync,
    handleStopBrowsersync,
    handleShowQrCode,
}: ButtonSectionProps) {
    const fontSize = 50;

    return (
        <Stack direction="row" justifyContent="end" alignItems="center">
            {isRunning ?
                <CustomIconButton
                    onClick={() => {
                        console.log("Stop Browsersync clicked");
                        handleStopBrowsersync();
                    }}
                    icon={<StopCircle sx={{ fontSize: fontSize }} />}
                />
                : <CustomIconButton
                    onClick={() => {
                        console.log("Start Browsersync clicked");
                        handleStartBrowsersync();
                    }}
                    icon={<PlayCircle sx={{ fontSize: fontSize }} />}
                />
            }
            <CustomIconButton
                onClick={() => {
                    console.log("Show QRCode clicked");
                    handleShowQrCode();
                }}
                icon={<QrCode sx={{ fontSize: fontSize }} />}
                iconButtonProps={{
                    disabled: !isRunning,
                }}
            />
        </Stack>
    )
}
