import { Box, Paper, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

import CheckboxWithLabel from "@/components/CheckboxWithLabel";
import type { SyncStore } from "@/types/browsersyncForm";

interface SyncProps {
    sync: SyncStore;
}

export default function Sync({ sync }: SyncProps) {
    const {
        enabled,
        toggleEnabled,
        scroll,
        setScroll,
        clicks,
        setClicks,
        forms,
        setForms,
        location,
        setLocation,
    } = sync;
    const id = "ghostMode";
    const { t } = useTranslation();

    return (
        <Box>
            <CheckboxWithLabel
                htmlFor={id}
                checked={enabled}
                onChange={toggleEnabled}
                label={t("home.sync.label")}
                helpText={t("home.sync.help_text")}
                isFormLabel={true}
            />

            <Paper sx={{ p: 1 }} >
                <Stack direction="row" gap={1.2}>
                    <CheckboxWithLabel
                        htmlFor={`${id}-scroll`}
                        label={t("home.sync.scroll")}
                        checked={scroll}
                        onChange={setScroll}
                        isFormLabel={true}
                        disabled={!enabled}
                    />
                    <CheckboxWithLabel
                        htmlFor={`${id}-clicks`}
                        label={t("home.sync.clicks")}
                        checked={clicks}
                        onChange={setClicks}
                        isFormLabel={true}
                        disabled={!enabled}
                    />
                    <CheckboxWithLabel
                        htmlFor={`${id}-forms`}
                        label={t("home.sync.forms")}
                        checked={forms}
                        onChange={setForms}
                        isFormLabel={true}
                        disabled={!enabled}
                    />
                    <CheckboxWithLabel
                        htmlFor={`${id}-location`}
                        label={t("home.sync.location")}
                        checked={location}
                        onChange={setLocation}
                        isFormLabel={true}
                        disabled={!enabled}
                    />
                </Stack>
            </Paper>
        </Box>
    );
}
