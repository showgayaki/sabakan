import { ReactNode } from "react";
import Header from "@/components/Header";
import { Box } from "@mui/material";

interface DefaultLayoutProps {
    children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
            }}
        >
            <Header />
            <Box
                component="main"
                sx={{
                    flex: 1,
                    p: 2,
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
