import { IconButton, IconButtonProps } from "@mui/material";

interface CustomIconButtonProps {
    size?: 'small' | 'medium' | 'large';
    onClick?: () => void;
    icon: React.ReactNode;
    disabled?: boolean;
    iconButtonProps?: IconButtonProps;
}

export default function CustomIconButton({
    size,
    onClick,
    icon,
    disabled,
    iconButtonProps,
}: CustomIconButtonProps) {
    return (
        <IconButton
            sx={{ p: 0 }}
            size={size}
            onClick={onClick}
            disabled={disabled}
            {...iconButtonProps}
        >
            {icon}
        </IconButton>
    );
}
