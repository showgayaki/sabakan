import {
    Divider,
    FormControl,
    InputLabel,
    TextField,
    TextFieldProps,
    InputAdornment,
    IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

interface CustomTextFieldProps {
    id?: string;
    label?: string;
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    type?: string;
    iconRight?: React.ReactNode;
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
    textFieldProps,
}: CustomTextFieldProps) {
    return (
        <FormControl fullWidth>
            {
                label && (
                    <InputLabel sx={{ position: "relative", top: "14px", left: "-14px" }}
                        shrink htmlFor={id}>
                        {label}
                    </InputLabel>
                )
            }
            <TextField
                sx={{
                    "& .MuiInputBase-input, & .MuiInputBase-root .MuiInputBase-input.MuiAutocomplete-input": {
                        backgroundColor: disabled ? "#1c1c1c" : undefined,
                        color: disabled ? "#333333" : undefined,
                        fontSize: "0.75rem",
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
