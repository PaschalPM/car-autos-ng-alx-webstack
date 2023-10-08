import { SxProps, Theme, TextField } from "@mui/material";
import { Field, FieldProps } from "formik";

function MyTextField<T>({
  name,
  label,
  initialValues,
  sx,
  type,
  required,
  disabled,
  value,
  fullWidth,
  size,
  readOnly,
}: {
  name: string;
  label: string;
  initialValues: T;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  fullWidth?: boolean;
  readOnly?: boolean;
  sx?: SxProps<Theme> | undefined;
  size?: "small" | "medium";
}) {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps<typeof initialValues>) => {
        return (
          <TextField
            {...field}
            InputProps={{
              readOnly,
            }}
            variant="outlined"
            size={size ? size : "small"}
            label={label}
            placeholder={label}
            value={value ?? meta.value}
            fullWidth={fullWidth}
            type={type}
            sx={sx}
            disabled={disabled}
            required={required}
            error={!!meta.error && meta.touched}
            helperText={!!meta.error && meta.touched && meta.error}
          />
        );
      }}
    </Field>
  );
}

export default MyTextField;
