import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import MyTextField from "../../formFields/MyTextField";
import { useField, useFormikContext } from "formik";
import { Marketer } from "../../../libs/form-configs/new-marketer";

type SubmitButtonProps = {
  text: string;
  suspenseText: string;
};
function SubmitButton({ text, suspenseText }: SubmitButtonProps) {
  const { isValid, dirty, isSubmitting } = useFormikContext<Marketer>();

  return (
    <Button
      startIcon={<CreateOutlinedIcon />}
      type="submit"
      variant="contained"
      disabled={!(isValid && dirty) || isSubmitting}
    >
      {!isSubmitting ? (
        <> {text} </>
      ) : (
        <>
          <span style={{ marginRight: "8px" }}> {suspenseText} </span>
          <CircularProgress size={15} sx={{ color: "#a6a6a6" }} />
        </>
      )}
    </Button>
  );
}

const PhoneNumberField = () => {
  const [field, meta, helpers] = useField("phoneNumber");

  return (
    <TextField
      {...field}
      label="Phone Number"
      size="small"
      sx={{ mb: 2 }}
      fullWidth
      required
      helperText={!!meta.error && meta.touched && meta.error}
      error={!!meta.error && meta.touched}
      onChange={(ev) => {
        const value = (ev.target as HTMLInputElement).value;
        helpers.setValue(value.replace(/[^+0-9]/, ""));
      }}
    />
  );
};

type UntrackedTextFieldProps = {
  value: string;
  label: string;
  name: string;
};
const UntrackedTextField = (props: UntrackedTextFieldProps) => {
  return (
    <TextField
      disabled={true}
      sx={{ mb: 2 }}
      size="small"
      {...props}
      fullWidth
    />
  );
};

type Props<T> = {
  initialValues: T;
  generatedUsername: string;
  generatedPassword: string;
  handleRegenerateCreds: () => void;
};

export default function Body<T>({
  initialValues,
  generatedUsername,
  generatedPassword,
  handleRegenerateCreds,
}: Props<T>) {
  const {} = useFormikContext<typeof initialValues>();

  return (
    <Paper sx={{ p: 3 }}>
      <MyTextField
        initialValues={initialValues}
        label="First Name"
        name="firstname"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <MyTextField
        initialValues={initialValues}
        label="Last Name"
        name="lastname"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <MyTextField
        initialValues={initialValues}
        label="Email"
        name="email"
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <PhoneNumberField />
      <UntrackedTextField
        value={generatedUsername}
        label="Username"
        name="username"
      />
      <UntrackedTextField
        value={generatedPassword}
        label="Password"
        name="password"
      />
      <Stack direction={"row"} justifyContent={"space-between"}>
        <SubmitButton suspenseText="creating" text="create"/>
        <Button
          color="secondary"
          size="small"
          onClick={(ev) => {
            ev.preventDefault();
            handleRegenerateCreds();
          }}
        >
          Regenerate Creds
        </Button>
      </Stack>
    </Paper>
  );
}
