import { Box, Tooltip, TooltipProps, Typography } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';

export function ValidationErrorTooltip({
    children,
    ...props
}: { children: React.ReactNode } & TooltipProps) {
    return (
        <Base
            {...props}
            title={<WarningTitle title={String(props.title)} />}
            placement="bottom"
            arrow
            open={Boolean(props.title)}
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -5], // X方向, Y方向
                            },
                        },
                    ],
                },
            }}
        >
            {children}
        </Base>
    );
}

export function CopyResultTooltip({
    children,
    ...props
}: { children: React.ReactNode } & TooltipProps) {
    return (
        <Base
            {...props}
            placement={props.placement ?? "bottom"}
            arrow
            open={Boolean(props.title)}
        >
            {children}
        </Base>
    );
}

function Base({
    children,
    ...props
}: { children: React.ReactNode } & TooltipProps) {
    return (
        <Tooltip
            {...props}
            slotProps={{
                ...props.slotProps,
                tooltip: {
                    sx: {
                        border: '1px solid grey',
                        fontSize: 14,
                    },
                },
            }}
        >
            <Box>
                {children}
            </Box>
        </Tooltip>
    )
}

function WarningTitle({ title }: { title: string }) {
    return (
        <Typography
            component="span"
            sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "inherit",
            }}
        >
            <ErrorIcon color="warning" sx={{ marginRight: 0.5 }} />
            <Typography
                component="span"
                sx={{ fontSize: "inherit" }}
            >
                {title}
            </Typography>
        </Typography>
    )
}
