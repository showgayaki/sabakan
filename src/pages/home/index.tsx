import { Box } from "@mui/material";

import { BrowsersyncForm } from "./components/ScreenshotForm";

export default function Home() {
    return (
        <Box sx={{ padding: 2 }}>
            <BrowsersyncForm />
        </Box>
    );
}
