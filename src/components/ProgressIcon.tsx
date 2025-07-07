import { Box, CircularProgress, } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { ProgressStatus } from "@/types/progress";

interface ProgressIconProps {
    status: ProgressStatus;
}

export default function ProgressIcon({ status }: ProgressIconProps) {
    const renderIcon = () => {
        switch (status) {
            case "success":
                return <CheckCircleIcon color="success" sx={{ width: "100%", height: "100%" }} />;
            case "error":
                return <ErrorIcon color="error" sx={{ width: "100%", height: "100%" }} />;
            case "pending":
                return <CircularProgress size={80} />;
            case "idle":
            default:
                return null; // 何も表示しないなど
        }
    };
    return (
        <Box sx={{ width: 80, height: 80, mb: 4 }}>
            {renderIcon()}
        </Box>
    )
};
