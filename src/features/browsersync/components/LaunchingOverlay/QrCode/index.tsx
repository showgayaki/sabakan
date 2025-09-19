import { Stack } from "@mui/material";
import type { BrowsersyncState, QrCodeState } from "@/types/browsersyncForm";

import QrCanvas from "./QrCanvas";
import UrlText from "./UrlText";
import Progress from "./Progress";

interface QrCodeProps {
    browsersync: BrowsersyncState,
    qrCode: QrCodeState,
}

export default function QrCode({ browsersync, qrCode }: QrCodeProps) {
    const { isRunning, url } = browsersync;
    const height = 164;

    return isRunning ?
        <Stack alignItems="center" sx={{ height: height }}>
            <QrCanvas url={url} qrCode={qrCode} />
            <UrlText url={url} qrCode={qrCode} />
        </Stack>
        : <Progress browsersync={browsersync} />
}
