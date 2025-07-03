import { Tooltip, TooltipProps } from "@mui/material";

export default function BottomArrowTooltip(props: TooltipProps, message: string) {
    return (
        <Tooltip open={Boolean(message)} placement="bottom" arrow
            {...props}
        />
    );
}
