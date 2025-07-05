import { Box, Tooltip, TooltipProps } from "@mui/material";

export default function BottomArrowTooltip({
    children,
    ...props
}: TooltipProps & { children: React.ReactNode }) {
    return (
        <Tooltip placement="bottom"
            arrow
            open={Boolean(props.title)}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            {...props}
        >
            <Box component="span">
                {children}
            </Box>
        </Tooltip>
    );
}
