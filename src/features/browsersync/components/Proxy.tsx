import { Box } from "@mui/material";

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
    const helpText = `ローカル環境のWordPressサイトなどと連携したい場合は、そのURLを入力してください`;

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
                label="Proxyを使用する"
                helpText={helpText}
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
