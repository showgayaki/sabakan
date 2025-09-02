import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

import ValidationErrorTooltip from "@/components/CustomTooltips";
import CheckboxWithLabel from "@/components/CheckboxWithLabel";
import CustomTextField from "@/components/CustomTextField";

interface ProxyProps {
    useProxy: boolean;
    setUseProxy: (useProxy: boolean) => void;
    url: string;
    setUrl: (url: string) => void;
    error?: string | null;
}

export default function ProxySection({
    useProxy,
    setUseProxy,
    url,
    setUrl,
    error,
}: ProxyProps) {
    const id = "useProxy";
    const { t } = useTranslation();

    return (
        <Box>
            <CheckboxWithLabel
                htmlFor="useProxy"
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
            <ValidationErrorTooltip title={error || ""}>
                <CustomTextField
                    id={id}
                    type="text"
                    value={url}
                    onChange={setUrl}
                    disabled={!useProxy}
                    placeholder="http://localhost:8080"
                    textFieldProps={{
                        error: Boolean(error),
                    }}
                />
            </ValidationErrorTooltip>
        </Box>
    );
}
