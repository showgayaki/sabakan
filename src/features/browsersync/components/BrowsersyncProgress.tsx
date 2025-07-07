import { Typography, } from "@mui/material";

import { ProgressStatus } from "@/types/progress";
import FullscreenOverlay from "@/components/FullscreenOverlay";
import ProgressIcon from "@/components/ProgressIcon";

interface BrowsersyncProgressProps {
    status: ProgressStatus;
    statusMessage: string;
}

export default function BrowsersyncProgress({ status, statusMessage }: BrowsersyncProgressProps) {
    return (
        <FullscreenOverlay>
            <ProgressIcon status={status} />
            <Typography
                variant="h6"
                sx={{ textAlign: "center", mb: 3 }}
                className="whitespace-pre-line"
            >
                {statusMessage}
            </Typography>
        </FullscreenOverlay>
    );
}
