import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ProgressIcon from "@/components/ProgressIcon";
import type { BrowsersyncState } from "@/types/browsersyncForm";

interface ProgressProps {
    browsersync: BrowsersyncState,
}

export default function Progress({browsersync}: ProgressProps) {
    const { status, statusMessage } = browsersync;
    const { t } = useTranslation();

    const height = 164;
    const progressIconSize = 80;

    return (
        <Stack spacing={2}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%", height: height }}
        >
            <ProgressIcon size={progressIconSize} status={status} />
            <Typography variant="h6">
                {statusMessage && t(statusMessage)}
            </Typography>
        </Stack>
    )
}
