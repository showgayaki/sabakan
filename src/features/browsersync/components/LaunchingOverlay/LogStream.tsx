import { Box } from "@mui/material";

interface LogStreamProps {
    logs: string[];
    containerRef: React.RefObject<HTMLDivElement>;
}

export default function LogStream({ logs, containerRef }: LogStreamProps) {
    return (
        <Box
            ref={containerRef}
            sx={{
                width: "100%",
                backgroundColor: "#000",
                px: 1,
                py: 0.5,
                overflowX: "auto",
                overflowY: "auto",
                fontSize: 14,
                border: "1px solid #333",
                whiteSpace: "pre",
                flexGrow: 1,
            }}
        >
            {logs.map((line, index) => (
                <p key={index} style={{ margin: 0 }}>{line}</p>
            ))}
        </Box>
    )
}
