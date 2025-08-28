import {
    Divider,
    FormControl,
    TextField,
    TextFieldProps,
    InputAdornment,
    IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import CustomLabel from "@/components/CustomLabel";

interface CustomTextFieldProps {
    id: string;
    label?: string;
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    type?: string;
    iconRight?: React.ReactNode;
    helpText?: string;
    textFieldProps?: Partial<TextFieldProps>;
}

export default function CustomTextField({
    id,
    label,
    value,
    onChange,
    placeholder,
    disabled,
    type,
    iconRight,
    helpText,
    textFieldProps,
}: CustomTextFieldProps) {
    return (
        <FormControl fullWidth>
            {
                label && (
                    <CustomLabel
                        label={label}
                        htmlFor={id}
                        helpText={helpText}
                        cursor="pointer"
                    />
                )
            }
            <TextField
                sx={{
                    "& .MuiInputBase-input, & .MuiInputBase-root .MuiInputBase-input.MuiAutocomplete-input": {
                        backgroundColor: disabled ? "#1c1c1c" : undefined,
                        color: disabled ? "#333333" : undefined,
                        fontSize: 12,
                    },
                }}
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                type={type}
                variant="outlined"
                size="small"
                fullWidth
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                    input: {
                        endAdornment: iconRight && (
                            <InputAdornment position="end" sx={{ marginRight: "-6px" }}>
                                {value && (
                                    <>
                                        <IconButton
                                            onClick={() => onChange("")}
                                            edge="end"
                                            size="small"
                                            sx={{ mr: 0.5 }}
                                        >
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </>
                                )}
                                <Divider orientation="vertical" flexItem />
                                {iconRight}
                            </InputAdornment>
                        ),
                    },
                }}
                {...textFieldProps}
            />
        </FormControl>
    );
}
