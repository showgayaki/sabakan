import { Stack } from "@mui/material";

interface DefaultLayoutProps {
    header?: React.ReactNode;
    children: React.ReactNode;
}

export default function DefaultLayout({ header, children }: DefaultLayoutProps) {
    return (
        <Stack
            direction="column"
            sx={{
                height: "100vh",
            }}
        >
            {header}
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
