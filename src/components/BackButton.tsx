import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <IconButton
            color="inherit"
            aria-label="menu"
            onClick={() => navigate(-1)}
            sx={{
                ml: -1,
            }}
        >
            <ArrowBackIcon />
        </IconButton>
    );
}
