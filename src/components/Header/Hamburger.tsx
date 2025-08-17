import { IconButton, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import MenuItems from "@/features/hamburger/components/MenuItems";
import useHamburger from "@/features/hamburger/hooks/useHamburger";
import { useMenuEvents } from "@/features/hamburger/hooks/useMenuEvents";

export default function Hamburger() {
    const hamburger = useHamburger();
    useMenuEvents({ hamburger });

    return (
        <>
            <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={hamburger.handleMenuClick}
            >
                <MenuIcon />
            </IconButton>

            <Menu
                anchorEl={hamburger.anchorEl}
                open={hamburger.open}
                onClose={hamburger.handleClose}
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
                <MenuItems hamburger={hamburger} />
            </Menu>
        </>
    )
}
