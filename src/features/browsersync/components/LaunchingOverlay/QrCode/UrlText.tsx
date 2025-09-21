import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { CopyIconButton } from "@/components/CustomIconButton";
import { CopyResultTooltip } from "@/components/CustomTooltips";
import type { QrCodeStore } from "@/types/browsersyncForm";

interface UrlTextProps {
    url: string,
    qrCode: QrCodeStore,
}

export default function UrlText({ url, qrCode }: UrlTextProps) {
    const { copiedUrl, copyUrl } = qrCode;
    const { t } = useTranslation();

    return (
        <CopyResultTooltip
            title={copiedUrl ? t(copiedUrl) : ""}
            placement="bottom"
            slotProps={{
                popper: {
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, -15], // X方向, Y方向
                            },
                        },
                    ],
                },
            }}
        >
            <Stack
                component="p"
                flexDirection="row"
                alignItems="center"
                sx={{ m: 0 }}
            >
                <Typography component="span">
                    {url}
                </Typography>
                <CopyIconButton
                    fontSize={20}
                    onClick={() => copyUrl(url)}
                    sx={{ p: 1 }}
                />
            </Stack>
        </CopyResultTooltip>
    )
}
