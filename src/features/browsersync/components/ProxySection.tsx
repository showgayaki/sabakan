import { Box } from "@mui/material";

import ValidationErrorTooltip from "@/components/CustomTooltips";
import CheckboxWithLabel from "@/components/Checkbox";
import CustomTextField from "@/components/CustomTextField";

interface ProxySectionProps {
    useProxy: boolean;
    setUseProxy: (useProxy: boolean) => void;
    url: string;
    setUrl: (username: string) => void;
    error?: string | null;
}

export default function ProxySection({
    useProxy,
    setUseProxy,
    url,
    setUrl,
    error,
}: ProxySectionProps) {
    const id = "proxySection";
    const helpText = `ローカル環境のWordPressサイトなどと連携したい場合は、そのURLを入力してください`;

    return (
        <Box>
            <CheckboxWithLabel
                htmlFor={id}
                checked={useProxy}
                onChange={setUseProxy}
                label="Proxyを使用する"
                helpText={helpText}
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
