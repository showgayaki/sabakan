import { FormControlLabel, Checkbox } from "@mui/material";

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

export default function CheckboxWithLabel({ checked, onChange, label }: CheckboxProps) {
    return (
        <FormControlLabel
            sx={{
                "& .MuiFormControlLabel-label": {
                    fontSize: "0.875rem",
                },
            }}
            label={label}
            control={
                <Checkbox
                    sx={{ py: 0, pr:0,  mr: 1 }}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
            }
        />
    );
}
