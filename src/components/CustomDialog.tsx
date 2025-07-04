import { ReactNode } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";

interface CustomDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export default function CustomDialog({
    open,
    onClose,
    title,
    children,
}: CustomDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ typography: "subtitle1", py: 1 }}>
                {title}
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>閉じる</Button>
            </DialogActions>
        </Dialog>
    );
}
