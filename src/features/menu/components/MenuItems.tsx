import { MenuItem } from "@mui/material";

import { type Hamburger } from "@/features/menu/hooks/useHamburger";

interface MenuItemsProps {
    hamburger: Hamburger;
};

export default function MenuItems({ hamburger }: MenuItemsProps) {
    return (
        <>
            <MenuItem onClick={hamburger.openLicense}>ライセンス</MenuItem>
            <MenuItem onClick={hamburger.openHelp}>ヘルプ</MenuItem>
        </>
    )
}
