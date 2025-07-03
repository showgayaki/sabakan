import { IconButton, IconButtonProps } from "@mui/material";
// import IconButton from '@mui/material/IconButton';

interface CustomIconButtonProps {
    size: 'small' | 'medium' | 'large';
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
            size={size}
            onClick={onClick}
            {...iconButtonProps}
        >
            {icon}
        </IconButton>
    );
}
