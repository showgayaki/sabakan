import { Checkbox, FormControlLabel } from "@mui/material";

import CustomLabel from "@/components/CustomLabel";

interface CheckboxWithLabelProps {
    htmlFor: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
    helpText?: string;
}

export default function CheckboxWithLabel({ htmlFor, checked, onChange, label, helpText }: CheckboxWithLabelProps) {
    return (
        <FormControlLabel
            sx={{
                mr: 0,
                ml: 0,
                "& .MuiCheckbox-root": {
                    pl: 0,
                },
            }}
            label={
                <CustomLabel
                    label={label}
                    htmlFor={htmlFor}
                    helpText={helpText}
                    isFormLabel
                    cursor="pointer"
                />
            }
            control={
                <Checkbox
                    sx={{ py: 0, pr:0,  mr: 0.5 }}
                    id={htmlFor}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
            }
        />
    );
}
