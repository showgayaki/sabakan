import { Box } from "@mui/material";

interface FullscreenOverlayProps {
    children: React.ReactNode;
}

export default function FullscreenOverlay({ children }: FullscreenOverlayProps) {
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
            {children}
        </Box>
    )
};
