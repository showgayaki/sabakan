import { Box, Tooltip, TooltipProps } from "@mui/material";

export default function ValidationErrorTooltip({
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
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 0], // X方向, Y方向
                            },
                        },
                    ],
                },
            }}
            {...props}
        >
            <Box>
                {children}
            </Box>
        </Tooltip>
    );
}
