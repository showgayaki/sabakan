import { Stack } from "@mui/material";

import Header from "@/components/Header";

interface DefaultLayoutProps {
    children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <Stack
            direction="column"
            sx={{
                height: "100vh",
            }}
        >
            <Header />
            <Stack
                component="main"
                direction="column"
                sx={{
                    flex: 1,
                    p: 2,
                }}
            >
                {children}
            </Stack>
        </Stack>
    );
}
