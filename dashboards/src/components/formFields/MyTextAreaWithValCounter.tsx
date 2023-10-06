import { SxProps, Theme, TextField, Typography, Box } from "@mui/material";
import { Field, FieldProps, FieldInputProps, FormikProps } from "formik";

function rangeDisplay<T>(value: T, maxValLen: number) {
  return typeof value === "string" && `${value.length}/${maxValLen}`;
}

type EventType = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function MyTextFieldWithValCounter<T>({
  name,
  label,
  initialValues,
  maxValLen,
  sx,
  type,
  required,
  disabled,
  value,
  fullWidth,
  size,
  multiline
}: {
  name: string;
  label: string;
  initialValues: T;
  maxValLen: number;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  fullWidth?: boolean;
  multiline?: boolean;
  sx?: SxProps<Theme> | undefined;
  size?: "small" | "medium";
}) {
  const handleChange = (
    ev: EventType,
    field: FieldInputProps<T>,
    form: FormikProps<T>,
    maxValLen: number
  ) => {
    const value = ev.target.value;
    if (value.length <= maxValLen) {
      form.setFieldValue(field.name, value);
    }
  };
  return (
    <Field name={name}>
      {({ field, meta, form }: FieldProps<typeof initialValues>) => {
        return (
          <Box position={"relative"} mb={3}>
            <TextField
              {...field}
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
              onChange={(ev) => handleChange(ev, field, form, maxValLen)}
              multiline={multiline}
              rows={multiline ? 4 : 1}
            />
            <Typography
              variant={"caption"}
              sx={{ position: "absolute", bottom: !!meta.error && meta.touched ? 0 : -24, right: 1 }}
            >
              {rangeDisplay(meta.value, maxValLen)}
            </Typography>
          </Box>
        );
      }}
    </Field>
  );
}

export default MyTextFieldWithValCounter;
