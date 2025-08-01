import { Stack, Tooltip } from "@mui/material";

import Logo from "@/assets/logo.png";

export default function AppLogo() {
    return (
        <Stack alignItems="center">
            <Tooltip arrow title="サバです">
                <img src={Logo} alt="logo" style={{ height: 32, cursor: "pointer" }} />
            </Tooltip>
        </Stack>
    );
}
