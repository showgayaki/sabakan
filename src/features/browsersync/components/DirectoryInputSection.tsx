import { Box, IconButton } from "@mui/material";
import { Folder } from "@mui/icons-material";

import CustomTextField from "@/components/CustomTextField";
import BottomArrowTooltip from "@/components/CustomTooltips";


interface DirectoryInputSectionProps {
    hostOs: string;
    path: string;
    setPath: (path: string) => void;
    onClick: () => void;
    error?: string | null;
}

export default function DirectoryInputSection({hostOs, path, setPath, onClick, error }: DirectoryInputSectionProps) {
    console.log("DirectoryInputSection rendered with hostOs:", hostOs);
    const placeholder = hostOs === "windows"
        ? "C:\\path\\to\\directory"
        : "/path/to/directory";

    return (
        <BottomArrowTooltip title={error || ""}>
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                <CustomTextField
                    id="directoryInput"
                    label="ディレクトリ選択"
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
                    textFieldProps={{
                        error: Boolean(error),
                    }}
                />
            </Box>
        </BottomArrowTooltip>
    );
}
