import { Checkbox, FormControlLabel, Stack } from "@mui/material";

import HelpTooltipIcon from "@/components/HelpTooltipIcon";

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    helpText?: string;
}

export default function CheckboxWithLabel({ checked, onChange, label, helpText }: CheckboxProps) {
    return (
        <FormControlLabel
            sx={{
                mr: 0,
                "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                },
            }}
            label={
                <Stack direction="row" alignItems="center" sx={{ gap: 0.5 }}>
                    {label}
                    {helpText && <HelpTooltipIcon title={helpText} />}
                </Stack>
            }
            control={
                <Checkbox
                    sx={{ py: 0, pr:0,  mr: 0.5 }}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
            }
        />
    );
}
