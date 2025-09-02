import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";

import { type Hamburger } from "@/features/hamburger/hooks/useHamburger";

interface MenuItemsProps {
    hamburger: Hamburger;
};

export default function MenuItems({ hamburger }: MenuItemsProps) {
    const { t } = useTranslation();

    return (
        <>
            <MenuItem onClick={hamburger.openLicense}>{t("hamburger.license")}</MenuItem>
            <MenuItem onClick={hamburger.openHelp}>{t("hamburger.help")}</MenuItem>
        </>
    )
}
