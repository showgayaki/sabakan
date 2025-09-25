import { Stack } from "@mui/material";
import type { BrowsersyncStore, QrCodeStore } from "@/types/browsersyncForm";

import QrCanvas from "./QrCanvas";
import UrlText from "./UrlText";
import Progress from "./Progress";

interface QrCodeProps {
    browsersync: BrowsersyncStore,
    qrCode: QrCodeStore,
}

export default function QrCode({ browsersync, qrCode }: QrCodeProps) {
    const { isRunning, url } = browsersync;
    const height = 164;

    return (
        <Stack
            alignItems="center"
            sx={{ width: "100%", height, minHeight: height }}
        >
            {isRunning ?
                <>
                    <QrCanvas url={url} qrCode={qrCode} />
                    <UrlText url={url} qrCode={qrCode} />
                </>
                : <Progress browsersync={browsersync} />
            }
        </Stack>
    )
}
