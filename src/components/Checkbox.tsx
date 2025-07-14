import { Checkbox, FormControlLabel } from "@mui/material";

import CustomLabel from "@/components/CustomLabel";

interface CheckboxProps {
    htmlFor: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    helpText?: string;
}

export default function CheckboxWithLabel({ htmlFor, checked, onChange, label, helpText }: CheckboxProps) {
    return (
        <FormControlLabel
            sx={{
                mr: 0,
                "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                },
            }}
            label={
                <CustomLabel
                    label={label}
                    htmlFor={htmlFor}
                    helpText={helpText}
                    isFormLabel
                />
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
