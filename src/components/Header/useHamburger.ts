import { useState } from "react";

import { openLicenseWindow } from "./api";

export type Hamburger = {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
    handleLicenseClick: () => Promise<void>;
}

export default function useHamburger(): Hamburger {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLicenseClick = async () => {
        handleClose();
        try {
            await openLicenseWindow();
        } catch (e) {
            console.error("Failed to open license window:", e);
        }
    };

    return {
        anchorEl,
        open,
        handleMenuClick,
        handleClose,
        handleLicenseClick,
    }
}
