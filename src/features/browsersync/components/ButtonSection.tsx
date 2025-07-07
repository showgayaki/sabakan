import { Stack } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";

import { BUTTON_FONT_SIZE } from "@/constants/ui";
import CustomIconButton from "@/components/CustomIconButton";

interface ButtonSectionProps {
    handleStartBrowsersync: () => void;
}

export default function ButtonSection({ handleStartBrowsersync }: ButtonSectionProps) {
    return (
        <Stack direction="row" justifyContent="center" alignItems="center">
            <CustomIconButton
                onClick={() => {
                    console.log("Start Browsersync clicked");
                    handleStartBrowsersync();
                }}
                icon={<PlayCircle sx={{ fontSize: BUTTON_FONT_SIZE }} />}
            />
        </Stack>
    )
}
