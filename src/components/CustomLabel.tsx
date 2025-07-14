import {
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface CustomLabelProps {
    label: string;
    htmlFor: string;
    helpText?: string;
    isFormLabel?: boolean;
}

export default function CustomLabel({ label, htmlFor, helpText, isFormLabel = false }: CustomLabelProps) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                mb: isFormLabel ? "inherit" : 0.3,
                gap: 0.5,
            }}
        >
            <Typography
                component="label"
                htmlFor={htmlFor}
                sx={{
                    fontSize: isFormLabel ? "14px" : "12px",
                    color: isFormLabel ? "inherit" : "rgb(170, 170, 170)",
                }}
            >
                {label}
            </Typography>
            {helpText && <HelpTooltipIcon title={helpText} />}
        </Stack>
    )
}

export function HelpTooltipIcon({ title }: { title: string }) {
    return (
        <Tooltip title={
            <Typography
                variant="inherit"
                sx={{ whiteSpace: "pre-line" }}
            >
                {title}
            </Typography>
        }
        >
            <HelpOutlineIcon
                sx={{
                    fontSize: "18px",
                    cursor: "pointer",
                    fill: "rgb(170, 170, 170)",
                }} />
        </Tooltip>
    )
}