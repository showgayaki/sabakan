import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import CheckboxWithLabel from "@/components/CheckboxWithLabel";
import CustomTextField from "@/components/CustomTextField";
import { ValidationErrorTooltip } from "@/components/CustomTooltips";
import type { ProxyParams } from "@/types/browsersyncForm";

interface ProxySectionProps {
    proxy: ProxyParams,
}

export default function ProxySection({ proxy }: ProxySectionProps) {
    const { useProxy, setUseProxy, url, setUrl, errorKey } = proxy;
    const id = "useProxy";
    const { t } = useTranslation();

    return (
        <Box>
            <CheckboxWithLabel
                htmlFor={id}
                checked={useProxy}
                onChange={(checked) => {
                    setUseProxy(checked);
                    if (!checked) {
                        setUrl("");
                    }
                }}
                label={t("home.proxy.label")}
                helpText={t("home.proxy.help_text")}
                isFormLabel={true}
            />
            <ValidationErrorTooltip
                title={errorKey ? t(errorKey) : ""}
            >
                <CustomTextField
                    id={id}
                    type="text"
                    value={url}
                    onChange={setUrl}
                    disabled={!useProxy}
                    placeholder="http://localhost:8080"
                    textFieldProps={{
                        error: Boolean(errorKey),
                    }}
                />
            </ValidationErrorTooltip>
        </Box>
    );
}
