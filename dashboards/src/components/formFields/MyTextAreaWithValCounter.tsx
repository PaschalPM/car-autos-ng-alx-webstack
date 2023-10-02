import { SxProps, Theme, TextField, Typography, Box } from "@mui/material";
import { Field, FieldProps, FieldInputProps, FormikProps } from "formik";

// type HangleChange =
//   | React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
//   | undefined;

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
            />
            <Typography variant={'caption'} sx={{position:'absolute', top:45, right: 1}}>
              {rangeDisplay(meta.value, maxValLen)}
              </Typography>
          </Box>
        );
      }}
    </Field>
  );
}

export default MyTextFieldWithValCounter;
