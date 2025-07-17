import {
    AppBar,
    Toolbar,
} from "@mui/material";

interface CustomAppbarProps {
    children?: React.ReactNode;
}

export default function CustomAppbar({ children }: CustomAppbarProps) {
    return (
        <AppBar
            position="static"
            sx={{
                height: 48,
                mb: 1,
                backgroundColor: "#222",
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: 0,
                    px: 2,
                    py: 0.5,
                }}
            >
                {children}
            </Toolbar>
        </AppBar>
    );
}
