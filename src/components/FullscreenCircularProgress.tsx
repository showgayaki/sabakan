import {
    Box,
    CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import { ProgressStatus } from "@/types/progress";

interface FullscreenCircularProgressProps {
    status: ProgressStatus;
    children: React.ReactNode;
}

export default function FullscreenCircularProgress({ status, children }: FullscreenCircularProgressProps) {
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
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                zIndex: 1300,
            }}
        >
            <Box sx={{ width: 80, height: 80, mb: 4 }}>
                {renderIcon()}
            </Box>
            {children}
        </Box>
    )
};
