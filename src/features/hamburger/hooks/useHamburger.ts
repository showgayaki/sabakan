import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { openUrl } from '@tauri-apps/plugin-opener';

import { REPOSITORY_URL } from "@/constants/urls";

export type Hamburger = {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
    openLicense: () => void;
    openHelp: () => void;
}

export default function useHamburger(): Hamburger {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openLicense = async () => {
        handleClose();
        navigate("/license");
    };

    const openHelp = async () => {
        handleClose();
        openUrl(REPOSITORY_URL);
    };

    return {
        anchorEl,
        open,
        handleMenuClick,
        handleClose,
        openLicense,
        openHelp,
    }
}
