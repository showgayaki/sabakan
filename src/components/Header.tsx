import { useState } from "react";
import {
    AppBar,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Tooltip,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import MenuIcon from "@mui/icons-material/Menu";

import Logo from "@/assets/logo.png";

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

function AppLogo() {
    return (
        <Stack alignItems="center">
            <Tooltip arrow title="サバです">
                <img src={Logo} alt="logo" style={{ height: 32, cursor: "pointer" }} />
            </Tooltip>
        </Stack>
    );
}


function Hamburger() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    // const navigate = useNavigate();

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLicenseClick = async () => {
        handleClose();
        try {
            await invoke("open_license_window");
        } catch (e) {
            console.error("Failed to open license window:", e);
        }
    };

    return (
        <>
            <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                slotProps={{
                    // MenuItemのスタイル調整
                    list: {
                        sx: {
                            "& .MuiMenuItem-root": {
                                fontSize: 14,
                                minHeight: 36,
                                px: 2,
                            },
                        },
                    },
                }}
            >
                <MenuItem onClick={handleLicenseClick}>ライセンス</MenuItem>
                <MenuItem onClick={handleClose}>このアプリについて</MenuItem>
            </Menu>
        </>
    )
}
