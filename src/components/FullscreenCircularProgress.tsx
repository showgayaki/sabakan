import {
    Box,
    CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface FullscreenCircularProgressProps {
    success?: boolean;
    children: React.ReactNode;
}

export default function FullscreenCircularProgress({ success, children }: FullscreenCircularProgressProps) {
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
                {success
                    ? <CheckCircleIcon color="success" sx={{ width: "100%", height: "100%" }} />
                    : <CircularProgress size={80} />
                }
            </Box>
            {children}
        </Box>
    )
};
