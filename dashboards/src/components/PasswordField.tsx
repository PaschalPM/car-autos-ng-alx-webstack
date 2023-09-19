import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { SxProps, Theme } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";

type Variant = "standard" | "outlined" | "filled";
export default function PasswordField({
  sx,
  variant,
  name,
  value,
  disabled,
  onChange,
}: {
  sx: SxProps<Theme>;
  variant?: Variant;
  name: string;
  value: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl sx={sx} variant={(variant as Variant) ?? "standard"}>
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input
        id="password"
        required
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((v) => !v)}
              // onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
