import { Box } from "@mui/material";

import BottomArrowTooltip from "@/components/CustomTooltips";
import CheckboxWithLabel from "@/components/Checkbox";
import CustomTextField from "@/components/CustomTextField";

interface ProxySectionProps {
    useProxy: boolean;
    setUseProxy: (useProxy: boolean) => void;
    url: string;
    setUrl: (username: string) => void;
    proxyError?: string | null;
}

export default function ProxySection({
    useProxy,
    setUseProxy,
    url,
    setUrl,
    proxyError,
}: ProxySectionProps) {
    return (
        <Box>
            <CheckboxWithLabel
                checked={useProxy}
                onChange={setUseProxy}
                label="Proxyを使用する"
            />
            <BottomArrowTooltip title={proxyError || ""}>
                <CustomTextField
                    type="text"
                    value={url}
                    onChange={setUrl}
                    disabled={!useProxy}
                    placeholder="http://localhost:8080"
                    textFieldProps={{
                        error: Boolean(proxyError),
                    }}
                />
            </BottomArrowTooltip>
        </Box>
    );
}
