import { ThemeProvider, CssBaseline } from "@mui/material";

import darkTheme from "./theme";
// import { AppInitializer } from "./Initializer";
import { AppRouter } from "./router";

function App() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                {/* <AppInitializer /> */}
                <AppRouter />
            </ThemeProvider>
        </>
    );
}

export default App;
