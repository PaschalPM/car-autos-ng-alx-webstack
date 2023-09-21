import { useState } from "react";

import { SxProps, Theme, TextField, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Field, FieldProps, FieldMetaProps } from "formik";

function PasswordField<T>({
  name,
  label,
  initialValue,
  sx,
  disabled,
  value,
  fullWidth,
  withAdornment,
  size
}: {
  name: string;
  label: string;
  initialValue: T;
  disabled?: boolean;
  value?: string;
  fullWidth?: boolean;
  withAdornment?: boolean;
  sx?: SxProps<Theme> | undefined;
  size?: "small" | "medium"
}) {
  const [showPassword, setShowPassword] = useState(false);
  const adornmentColor: (
    meta: FieldMetaProps<typeof initialValue>
  ) => "action" | "error" = (meta) =>
    `${meta.error && meta.touched ? "error" : "action"}`;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps<typeof initialValue>) => {
        return (
          <TextField
            {...field}
            variant="outlined"
            required
            size={size ? size : 'small'}
            label={label}
            placeholder={label}
            value={value ?? meta.value}
            fullWidth={fullWidth}
            type={showPassword ? "text" : "password"}
            sx={sx}
            disabled={disabled}
            error={!!meta.error && meta.touched}
            helperText={!!meta.error && meta.touched && meta.error}
            InputProps={{
              endAdornment: (
                <>
                  {withAdornment && (
                    <InputAdornment
                      position="start"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setShowPassword((v) => !v)}
                    >
                      {showPassword ? (
                        <Visibility color={adornmentColor(meta)} />
                      ) : (
                        <VisibilityOff color={adornmentColor(meta)} />
                      )}
                    </InputAdornment>
                  )}
                </>
              ),
            }}
          />
        );
      }}
    </Field>
  );
}

export default PasswordField;
