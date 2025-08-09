import { ThemeProvider, CssBaseline } from "@mui/material";

import { useHostOs } from "./context";
import { GlobalStyles } from "./GlobalStyles";
import { AppInitializer } from "./Initializer";
import { AppRouter } from "./router";
import darkTheme from "./theme";

function App() {
    const hostOs = useHostOs();
    console.log("Host OS:", hostOs);

    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {hostOs === "windows" && <AppInitializer />}
                <AppRouter />
            </ThemeProvider>
        </>
    );
}

export default App;
