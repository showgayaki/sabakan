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
            position="sticky"
            sx={{
                top: 0,
                height: 48,
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
