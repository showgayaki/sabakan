import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Typography,
    Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export function H2({ text }: { text: string }) {
    return (
        <Typography variant="h2" sx={{ mb: 2, fontSize: "1.5rem", fontWeight: 400 }}>
            {text}
        </Typography>
    );
}

export function H3({ text }: { text: string }) {
    return (
        <Typography variant="h3" sx={{ mb: 1.5, fontSize: "1.25rem" }}>
            {text}
        </Typography>
    )
}

export function H4({ children }: { children: React.ReactNode }) {
    return (
        <Typography variant="h4" sx={{ mb: 1, fontSize: "1rem" }}>
            {children}
        </Typography >
    )
}

export function Ul({ children }: { children: React.ReactNode }) {
    return (
        <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mb: 2 }}>
            {children}
        </Box>
    )
}

export function Li({ children }: { children: React.ReactNode }) {
    return (
        <Box component="li" sx={{ listStyle: "none", p: 0, m: 0, mb: 2 }}>
            {children}
        </Box>
    )
}

export function A({ href, text }: { href: string | undefined, text: string }) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {text}
        </Link>
    )
}

export function Pre({ text }: { text: string }) {
    return (
        <Box component="pre"
            sx={{
                height: 300,
                p: 1,
                mt: 0,
                bgcolor: "#333",
                overflowY: "scroll",
                whiteSpace: "pre-wrap",
                fontSize: "0.875rem",
                fontFamily: "Courier New, Courier, monospace",
            }}
        >
            {text}
        </Box>
    )
}
