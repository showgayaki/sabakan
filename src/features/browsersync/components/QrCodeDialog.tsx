import { Box } from "@mui/material";
import { QRCodeCanvas } from 'qrcode.react';

import CustomDialog from "@/components/CustomDialog";

interface QrCodeDialogProps {
    open: boolean;
    onClose: () => void;
    qrCodeUrl: string;
}

export default function QrCodeDialog({ open, onClose, qrCodeUrl }: QrCodeDialogProps) {
    return (
        <CustomDialog open={open} onClose={onClose} title={qrCodeUrl}>
            <Box sx={{ textAlign: "center", padding: 2 }}>
                <QRCodeCanvas value={qrCodeUrl} />
            </Box>
        </CustomDialog>
    );
}
