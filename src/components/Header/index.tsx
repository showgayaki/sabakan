import {
    AppBar,
    Toolbar,
} from "@mui/material";

import AppLogo from "./AppLogo";
import Hamburger from "./Hamburger";

export default function Header() {
    return (
        <AppBar
            position="static"
            sx={{
                mb: 1,
                backgroundColor: "#222",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    minHeight: 30,
                    px: 2,
                    py: 0.5,
                }}
            >
                <AppLogo />
                <Hamburger />
            </Toolbar>
        </AppBar>
    );
}
