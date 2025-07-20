import { Stack } from "@mui/material";

import type { HeaderVariant } from "@/types/header";
import Header from "@/components/Header";

interface DefaultLayoutProps {
    variant: HeaderVariant;
    children: React.ReactNode;
}

export default function DefaultLayout({ variant, children }: DefaultLayoutProps) {
    return (
        <>
            <Header variant={variant} />
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
