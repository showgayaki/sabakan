import {
    Tooltip,
    Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";


export default function HelpTooltipIcon({ title }: { title: string }) {
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
                    fontSize: "1.2em",
                    cursor: "pointer",
                    fill: "rgb(170, 170, 170)",
                }} />
        </Tooltip>
    )
}
