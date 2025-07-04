import { Box, Tooltip, TooltipProps } from "@mui/material";

export default function BottomArrowTooltip({
    children,
    ...props
}: TooltipProps & { children: React.ReactNode }) {
    return (
        <Tooltip placement="bottom" arrow {...props}>
            <Box component="span">
                {children}
            </Box>
        </Tooltip>
    );
}
