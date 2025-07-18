import { Stack } from "@mui/material";

interface DefaultLayoutProps {
    header?: React.ReactNode;
    children: React.ReactNode;
}

export default function DefaultLayout({ header, children }: DefaultLayoutProps) {
    return (
        <>
            {header}
            <Stack
                component="main"
                direction="column"
                sx={{
                    flexGrow: 1,
                    p: 2,
                }}
            >
                {children}
            </Stack >
        </>
    );
}
