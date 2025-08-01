import { ThemeProvider, CssBaseline } from "@mui/material";

import darkTheme from "./theme";
import { GlobalStyles } from "./GlobalStyles";
import { AppRouter } from "./router";

function App() {
    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <AppRouter />
            </ThemeProvider>
        </>
    );
}

export default App;
