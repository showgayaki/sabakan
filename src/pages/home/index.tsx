import { Box } from "@mui/material";

import { BrowsersyncForm } from "./components/BrowsersyncForm";

export default function Home() {
    return (
        <Box sx={{ p: 2, height: "100vh"}}>
            <BrowsersyncForm />
        </Box>
    );
}
