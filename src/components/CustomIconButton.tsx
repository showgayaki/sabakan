import { IconButton, IconButtonProps } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export function CircleIconButton({
    icon,
    ...props
}: {icon: React.ReactNode} & IconButtonProps) {
    return (
        <IconButton
            sx={{ p: 0 }}
            {...props}
        >
            {icon}
        </IconButton>
    );
}

export function CopyIconButton({
    fontSize,
    ...props
}: { fontSize: number } & IconButtonProps) {
    return (
        <IconButton {...props}>
            <ContentCopyIcon sx={{ fontSize: fontSize }} />
        </IconButton>
    )
}
