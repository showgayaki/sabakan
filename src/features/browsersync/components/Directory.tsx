import { IconButton } from "@mui/material";
import { Folder } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

import { useHostOs } from "@/config/context";
import CustomTextField from "@/components/CustomTextField";
import { ValidationErrorTooltip } from "@/components/CustomTooltips";
import type { DirectoryParams } from "@/types/browsersyncForm";

interface DirectoryProps {
    directory: DirectoryParams,
}

export default function Directory({ directory }: DirectoryProps) {
    const { path, setPath, onClick, errorKey } = directory;

    const { t } = useTranslation();
    const hostOs = useHostOs();
    console.log("Directory rendered with hostOs:", hostOs);

    const placeholder = hostOs === "windows"
        ? "C:\\path\\to\\directory"
        : "/path/to/directory";

    return (
        <ValidationErrorTooltip
            title={errorKey ? t(errorKey) : ""}
        >
            <CustomTextField
                id="directoryInput"
                label={t("home.directory.label")}
                type="text"
                value={path}
                onChange={setPath}
                placeholder={placeholder}
                iconRight={
                    <IconButton
                        size="small"
                        sx={{ marginLeft: 1 }}
                        onClick={onClick}
                    >
                        <Folder />
                    </IconButton>
                }
                helpText={t("home.directory.help_text")}
                textFieldProps={{
                    error: Boolean(errorKey),
                }}
            />
        </ValidationErrorTooltip>
    );
}
