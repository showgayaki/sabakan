import { IconButton } from "@mui/material";
import { Folder } from "@mui/icons-material";

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
    const placeholder = hostOs === "windows"
        ? "C:\\path\\to\\directory"
        : "/path/to/directory";
    const helpText = `監視対象にするディレクトリを選択してください。
        このディレクトリをルートディレクトリとしてBrowsersyncサーバーが起動します。
        選択されたディレクトリ内のファイルが更新されると、ブラウザがリロードされます。`;

    return (
        <ValidationErrorTooltip title={error || ""}>
            <CustomTextField
                id="directoryInput"
                label="ルートディレクトリ選択"
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
                helpText={helpText}
                textFieldProps={{
                    error: Boolean(error),
                }}
            />
        </ValidationErrorTooltip>
    );
}
