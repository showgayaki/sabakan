import { Typography } from "@mui/material";

import { ProgressStatus } from "@/types/progress";
import FullscreenOverlay from "@/components/FullscreenOverlay";
import ProgressIcon from "@/components/ProgressIcon";

interface LaunchingOverlayProps {
    status: ProgressStatus;
    statusMessage: string;
}

export default function LaunchingOverlay({ status, statusMessage }: LaunchingOverlayProps) {
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
