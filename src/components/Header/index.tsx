import {
    AppBar,
    Toolbar,
} from "@mui/material";

import type { HeaderVariant } from "@/types/header";
import BackButton from "@/components/BackButton";

import AppLogo from "./AppLogo";
import Hamburger from "./Hamburger";

interface HeaderProps {
    variant: HeaderVariant;
}

export default function Header({ variant }: HeaderProps) {
    return (
        <AppBar
            position="sticky"
            sx={{
                top: 0,
                height: 48,
                backgroundColor: "#222",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: 0,
                    px: 2,
                    py: 0.5,
                    "@media (min-width:600px)": {
                        minHeight: 0,
                        px: 2,
                    },
                }}
            >
                {variant === "home" ? <HomeHeaderContent /> : <InnerHeaderContent />}
            </Toolbar>
        </AppBar>
    );
}

function HomeHeaderContent() {
    return (
        <>
            <AppLogo />
            <Hamburger />
        </>
    )
}

function InnerHeaderContent() {
    return <BackButton />
}
