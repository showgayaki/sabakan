import { MenuItem } from "@mui/material";

import { type Hamburger } from "./useHamburger";

interface MenuItemsProps {
    hamburger: Hamburger;
};

export default function MenuItems({ hamburger }: MenuItemsProps) {
    return (
        <>
            <MenuItem onClick={hamburger.handleLicenseClick}>ライセンス</MenuItem>
            {/* <MenuItem onClick={hamburger.handleClose}>このアプリについて</MenuItem> */}
        </>
    )
}
