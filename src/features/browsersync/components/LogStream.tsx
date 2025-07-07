import { Box, Typography } from "@mui/material";

interface LogStreamProps {
    height: string;
    logs: string[];
    containerRef: React.RefObject<HTMLDivElement>;
}

export default function LogStream({ height, logs, containerRef }: LogStreamProps) {
    return (
        <Box
            ref={containerRef}
            sx={{
                width: "90%",
                height,
                backgroundColor: "#000",
                px: 2,
                overflowX: "auto",
                overflowY: "auto",
                fontSize: "0.825rem",
                border: "1px solid #333",
                whiteSpace: "pre",
                boxSizing: "border-box",
                flexGrow: 0,
            }}
        >
            {logs.map((line, index) => (
                <Typography key={index} variant="body2">
                    {line}
                </Typography>
            ))}
        </Box>
    )
}
