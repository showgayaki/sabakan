import { Box, Paper, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import CheckboxWithLabel from "@/components/CheckboxWithLabel";
import type { GhostModeStore } from "@/types/browsersyncForm";

interface SyncProps {
    ghostMode: GhostModeStore;
}

export default function GhostMode({ ghostMode }: SyncProps) {
    const {
        enabled,
        toggleEnabled,
        scroll,
        setScroll,
        clicks,
        setClicks,
        forms,
        setForms,
    } = ghostMode;
    const id = "ghostMode";
    const { t } = useTranslation();

    return (
        <Box>
            <CheckboxWithLabel
                htmlFor={id}
                checked={enabled}
                onChange={toggleEnabled}
                label={t("home.ghost_mode.label")}
                helpText={t("home.ghost_mode.help_text")}
                isFormLabel={true}
            />

            <Paper sx={{ p: 1 }} >
                <Stack direction="row" gap={2}>
                    <CheckboxWithLabel
                        htmlFor={`${id}-scroll`}
                        label={t("home.ghost_mode.scroll")}
                        checked={scroll}
                        onChange={setScroll}
                        isFormLabel={true}
                        disabled={!enabled}
                    />
                    <CheckboxWithLabel
                        htmlFor={`${id}-clicks`}
                        label={t("home.ghost_mode.clicks")}
                        checked={clicks}
                        onChange={setClicks}
                        isFormLabel={true}
                        disabled={!enabled}
                    />
                    <CheckboxWithLabel
                        htmlFor={`${id}-forms`}
                        label={t("home.ghost_mode.forms")}
                        checked={forms}
                        onChange={setForms}
                        isFormLabel={true}
                        disabled={!enabled}
                    />
                </Stack>
            </Paper>
        </Box>
    );
}
