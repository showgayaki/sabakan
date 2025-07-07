import { Box } from "@mui/material";


interface LogStreamProps {
    log: string;
}

export default function LogStream({ log }: LogStreamProps) {
    return (
        <Box
            sx={{
                width: "90%",
                height: "100%",
                backgroundColor: "#000",
                p: 1,
                overflowY: "auto",
                fontSize: "0.875rem",
                border: "1px solid #333",
            }}
        >
            {log}
        </Box>
    )
}
