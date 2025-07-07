import { IconButton, IconButtonProps } from "@mui/material";

interface CustomIconButtonProps {
    size?: 'small' | 'medium' | 'large';
    onClick: () => void;
    icon: React.ReactNode;
    iconButtonProps?: IconButtonProps;
}

export default function CustomIconButton({
    size,
    onClick,
    icon,
    iconButtonProps,
}: CustomIconButtonProps) {
    return (
        <IconButton
            sx={{ p: 0 }}
            size={size ?? size}
            onClick={onClick}
            {...iconButtonProps}
        >
            {icon}
        </IconButton>
    );
}
