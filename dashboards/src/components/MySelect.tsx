import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  label: string;
  options: {
    value: string;
    text: string;
  }[];
};

export default function MySelect({ label, options }: Props) {
  return (
    <TextField label={label} select>
      {options.map(({ text, value }, idx) => (
        <MenuItem key={idx} value={value}>
          {text}
        </MenuItem>
      ))}
    </TextField>
  );
}
