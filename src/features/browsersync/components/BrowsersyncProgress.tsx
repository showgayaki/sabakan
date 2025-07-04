import { Typography, } from "@mui/material";

import { ProgressStatus } from "@/types/progress";
import FullscreenCircularProgress from "@/components/FullscreenCircularProgress";

interface BrowsersyncProgressProps {
    status: ProgressStatus;
    statusMessage: string;
}

export default function BrowsersyncProgress({ status, statusMessage }: BrowsersyncProgressProps) {
    return (
        <FullscreenCircularProgress status={status}>
            <Typography
                variant="h6"
                sx={{ textAlign: "center", mb: 3 }}
                className="whitespace-pre-line"
            >
                {statusMessage}
            </Typography>
        </FullscreenCircularProgress>
    );
}
