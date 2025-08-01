import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#2a2a2a",
            paper: "#3a3a3a",
        },
        text: {
            primary: "#ffffff",
            secondary: "#aaaaaa",
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarWidth: "thin",
                },
                "*::-webkit-scrollbar": {
                    width: "8px",
                    height: "8px",
                },
                "*::-webkit-scrollbar-track": {
                    backgroundColor: "#444",
                },
                "*::-webkit-scrollbar-thumb": {
                    backgroundColor: "#888",
                    borderRadius: "4px",
                },
                "*::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#aaa",
                },
            },
        },
    },
});

export default darkTheme;
