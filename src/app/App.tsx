import { ThemeProvider, CssBaseline } from "@mui/material";

import { useHostOs } from "@/config/context";
import "@/config/i18n";
import GlobalStyles from "@/config/styles/GlobalStyles";
import darkTheme from "@/config/styles/theme";
import WindowsSetup from "@/features/installation";

import AppRouter from "./router";

function App() {
    const hostOs = useHostOs();
    console.log("Host OS:", hostOs);

    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {hostOs === "windows" && <WindowsSetup />}
                <AppRouter />
            </ThemeProvider>
        </>
    );
}

export default App;
