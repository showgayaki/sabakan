import { FormControlLabel, Checkbox } from "@mui/material";

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

export default function CheckboxWithLabel({ checked, onChange, label }: CheckboxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

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
                    sx={{ py: 0, pr: 0.5 }}
                    checked={checked}
                    onChange={handleChange}
                />
            }
        />
    );
}
