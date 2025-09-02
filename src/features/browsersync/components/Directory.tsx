import { IconButton } from "@mui/material";
import { Folder } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

import CustomTextField from "@/components/CustomTextField";
import ValidationErrorTooltip from "@/components/CustomTooltips";

interface DirectoryProps {
    hostOs: string;
    path: string;
    setPath: (path: string) => void;
    onClick: () => void;
    error?: string | null;
}

export default function Directory({
    hostOs,
    path,
    setPath,
    onClick,
    error,
}: DirectoryProps) {
    console.log("Directory rendered with hostOs:", hostOs);
    const { t } = useTranslation();

    const placeholder = hostOs === "windows"
        ? "C:\\path\\to\\directory"
        : "/path/to/directory";

    return (
        <ValidationErrorTooltip title={error || ""}>
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
                    error: Boolean(error),
                }}
            />
        </ValidationErrorTooltip>
    );
}
