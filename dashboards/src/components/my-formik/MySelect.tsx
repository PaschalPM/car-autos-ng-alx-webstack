import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useField } from "formik";
import AccountCircle from "@mui/icons-material/AccountCircle";

type Props = {
  name: string;
  label: string;
  options: OptionType[];
  defaultValue?: string;
  disabled?: boolean;
};

export default function MySelect({
  name,
  label,
  options,
  disabled,
  defaultValue,
}: Props) {
  const [field, meta] = useField(name);
  return (
    <Box mb={2}>
      <TextField
        {...field}
        label={label}
        required
        select
        fullWidth
        size="small"
        error={!!meta.error && meta.touched}
        helperText={!!meta.error && meta.touched && meta.error}
        disabled={disabled}
        value={meta.value ?? ""}
        defaultValue={defaultValue}
        SelectProps={{
          startAdornment: name === "user" && (
            <AccountCircle
              sx={{ color: `${meta.error && meta.touched && "error.main"}`, mr: 1, my: 0.5 }}
            />
          ),
        }}
      >
        {options.map(({ value, text }, idx) => (
          <MenuItem value={value} key={idx}> {text} </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
