import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type Hamburger = {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleMenuClick: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
    handleLicenseClick: () => void;
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

    const handleLicenseClick = () => {
        handleClose();
        navigate("/license");
    };

    return {
        anchorEl,
        open,
        handleMenuClick,
        handleClose,
        handleLicenseClick,
    }
}
