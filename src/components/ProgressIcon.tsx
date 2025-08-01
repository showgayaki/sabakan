import { CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import type { ProgressStatus } from "@/types/progress";

interface ProgressIconProps {
    size: number;
    status: ProgressStatus;
}

export default function ProgressIcon({ size, status }: ProgressIconProps) {
    const ICON_STYLE = { width: `${size}px`, height: `${size}px`, mb: 2 };

    switch (status) {
        case "success":
            return <CheckCircleIcon color="success" sx={ICON_STYLE} />;
        case "error":
            return <ErrorIcon color="error" sx={ICON_STYLE} />;
        case "pending":
            return <CircularProgress size={size} sx={{mb: 2}} />;
        case "idle":
        default:
            return null; // 何も表示しないなど
    }
};
