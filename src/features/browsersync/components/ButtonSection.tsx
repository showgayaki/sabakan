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
    return (
        <Stack direction="row" justifyContent="end" alignItems="center">
            {isRunning ?
                <CustomIconButton
                    size="medium"
                    onClick={() => {
                        console.log("Stop Browsersync clicked");
                        handleStopBrowsersync();
                    }}
                    icon={<StopCircle fontSize="large" />}
                />
                : <CustomIconButton
                    size="medium"
                    onClick={() => {
                        console.log("Start Browsersync clicked");
                        handleStartBrowsersync();
                    }}
                    icon={<PlayCircle fontSize="large" />}
                />
            }
            <CustomIconButton
                size="medium"
                onClick={() => {
                    console.log("Show QRCode clicked");
                    handleShowQrCode();
                }}
                icon={<QrCode fontSize="large" />}
                iconButtonProps={{
                    disabled: !isRunning,
                }}
            />
        </Stack>
    )
}
