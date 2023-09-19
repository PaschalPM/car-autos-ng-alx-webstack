import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Save from "@mui/icons-material/Save";

import LoadingSpinner from "../components/LoadingSpinner";
import PasswordField from "../components/PasswordField";
import { baseColor } from "../libs/utils";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { hasFormChanged } from "../libs/utils";

const MyTextField = ({
  label,
  name,
  initialValue,
  type,
  disabled,
  onChange,
}: {
  label: string;
  name: string;
  initialValue: string;
  type?: "text" | "number" | "password" | "email";
  disabled?: boolean;
  onChange?:
    | React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    | undefined;
}) => (
  <TextField
    label={label}
    variant="standard"
    name={name}
    disabled={disabled ? true : initialValue === "..."}
    value={initialValue}
    type={type ? type : "text"}
    onChange={onChange}
    sx={{
      flexGrow: 1,
      flexBasis: "350px",
    }}
  />
);
export default function MyDetails() {
  const [initialValuesJSON, setInitialValuesJSON] = useState<string>("");
  const [initialValues, setInitialValues] = useState<UserValues>({
    firstname: "...",
    lastname: "...",
    username: "...",
    email: "...",
    password: "...",
    group: "Manager",
  });

  const validationSchema = Yup.object({
    firstname: Yup.string().required().min(3),
    lastname: Yup.string().required().min(3),
    username: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8),
  });

  useEffect(() => {
    setTimeout(() => {
      const user = {
        firstname: "Paschal",
        lastname: "Okafor",
        username: "pasmac",
        email: "okaforpaschal018@gmail.com",
        password: "123456789",
      };
      setInitialValues(user);

      setInitialValuesJSON(() => JSON.stringify(user).toString());
    }, 3000);
  }, []);

  type HandleSubmit = React.FormEventHandler<HTMLFormElement>;

  const handleSubmit: HandleSubmit = (ev) => {
    ev.preventDefault();
    const target = ev.target as HTMLFormElement & {
      firstname: HTMLInputElement;
      lastname: HTMLInputElement;
      username: HTMLInputElement;
      email: HTMLInputElement;
      password: HTMLInputElement;
      group: HTMLInputElement;
    };
    const body = {} as UserValues;
    body.firstname = target.firstname.value as string;
    body.lastname = target.lastname.value as string;
    body.username = target.username.value as string;
    body.email = target.email.value as string;
    body.password = target.password.value as string;
    body.group = target.group.value as string;

    validationSchema
      .validate(body)
      .then((value) => {
        console.log(value);
      })
      .catch((e: Yup.ValidationError) => {
        console.log(e.name);
      });
  };
  return (
    <>

      <LoadingSpinner condition={initialValues.username === "..."} />

      <Typography variant="h5"> Update My Details</Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <form action="" onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 6,
            rowGap: 2,
            px: 1,
          }}
        >
          <MyTextField
            label="First Name"
            name="firstname"
            initialValue={initialValues.firstname}
            onChange={(ev) =>
              setInitialValues((v) => ({
                ...v,
                firstname: ev.target.value as string,
              }))
            }
          />

          <MyTextField
            label="Last Name"
            name="lastname"
            initialValue={initialValues.lastname}
            onChange={(ev) =>
              setInitialValues((v) => ({
                ...v,
                lastname: ev.target.value as string,
              }))
            }
          />

          <MyTextField
            label="Username"
            name="username"
            initialValue={initialValues.username}
            onChange={(ev) =>
              setInitialValues((v) => ({
                ...v,
                username: ev.target.value as string,
              }))
            }
          />

          <MyTextField
            label="Email"
            name="email"
            type="email"
            initialValue={initialValues.email}
            onChange={(ev) =>
              setInitialValues((v) => ({
                ...v,
                email: ev.target.value as string,
              }))
            }
          />
          <PasswordField
            name="password"
            sx={{
              flexGrow: 1,
              flexBasis: "350px",
            }}
            value={initialValues.password}
            onChange={(ev) =>
              setInitialValues((v) => ({
                ...v,
                password: ev.target.value as string,
              }))
            }
          />

          <MyTextField
            label="Group"
            disabled={true}
            name="group"
            initialValue={"Manager"}
          />

          <Button
            variant="contained"
            size="small"
            color="inherit"
            type="submit"
            disabled={
              initialValues.username === "..." ||
              !hasFormChanged(initialValuesJSON, initialValues)
            }
            sx={{
              backgroundColor: baseColor,
              color: "#fff",
              mt: 1,
              "&:hover": {
                backgroundColor: baseColor,
              },
            }}
            startIcon={<Save />}
          >
            Save changes
          </Button>
        </Box>
      </form>
    </>
  );
}
