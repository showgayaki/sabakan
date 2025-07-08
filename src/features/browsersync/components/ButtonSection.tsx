import { Stack } from "@mui/material";
import { PlayCircle } from "@mui/icons-material";

import { BUTTON_FONT_SIZE } from "@/constants/ui";
import CustomIconButton from "@/components/CustomIconButton";

export default function ButtonSection() {
    return (
        <Stack
            direction="row"
            justifyContent="center"
        >
            <CustomIconButton
                icon={<PlayCircle sx={{ fontSize: BUTTON_FONT_SIZE }} />}
                iconButtonProps={{
                    type: "submit"
                }}
            />
        </Stack>
    )
}
