import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { QRCodeCanvas } from "qrcode.react";

import { CopyIconButton } from "@/components/CustomIconButton";
import { CopyResultTooltip } from "@/components/CustomTooltips";
import type { QrCodeStore } from "@/types/browsersyncForm";

interface QrCanvasProps {
    url: string,
    qrCode: QrCodeStore,
}

export default function QrCanvas({ url, qrCode }: QrCanvasProps) {
    const { canvasRef, copyQrImage, copiedQr } = qrCode;
    const { t } = useTranslation();

    const qrCodeSize = 120;
    const copyButtonClass = "copy-btn";

    return (
        <Box
            sx={{
                mb: 1,
                position: "relative",
                [`&:hover .${copyButtonClass}`]: {
                    opacity: 1,
                    bgcolor: "rgba(0, 0, 0, 0.7)",
                    borderRadius: 0,
                },
            }}
        >
            <QRCodeCanvas
                ref={canvasRef}
                size={qrCodeSize}
                height={qrCodeSize}
                value={url}
                marginSize={2}
                style={{ display: "block" }} // これしないと変な余白がつきます
            />
            <CopyResultTooltip
                title={copiedQr ? t(copiedQr) : ""}
                placement="bottom"
            >
                <CopyIconButton
                    fontSize={42}
                    className={copyButtonClass}
                    onClick={copyQrImage}
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        opacity: 0,
                        transition: "opacity 0.3s",
                    }}
                />
            </CopyResultTooltip>
        </Box>
    )
}