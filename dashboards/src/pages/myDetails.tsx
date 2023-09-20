import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Save from "@mui/icons-material/Save";

import LoadingSpinner from "../components/LoadingSpinner";
import PasswordField from "../components/PasswordField";
import { baseColor, ucfirst } from "../libs/utils";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { hasFormChanged } from "../libs/utils";
import Error from "../components/alerts/Error";
import _ from "lodash";
import { handleSubmit } from "../libs/snippets/myDetails";

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
    phoneNumber: "...",
    password: "...",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readyData, setReadyData] = useState<UserValues>({} as UserValues);
  const [submissionError, setSubmissionError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      const user = {
        firstname: "Paschal",
        lastname: "Okafor",
        username: "pasmac",
        email: "okaforpaschal018@gmail.com",
        phoneNumber: "07031102089",
        password: "123456789",
      };
      setInitialValues(user);

      setInitialValuesJSON(() => JSON.stringify(user).toString());
    }, 3000);
  }, []);

  return (
    <>
      <LoadingSpinner condition={initialValues.username === "..."} />
      <Error
        errorMessageState={submissionError}
        handleClose={() => {
          setSubmissionError("");
          setIsSubmitting(false);
        }}
      />
      <Snackbar
        message={"Submitting form..."}
        open={!_.isEmpty(readyData)}
        autoHideDuration={5000}
        action={
          <Button
            onClick={() => {
              setReadyData({} as UserValues);
              setIsSubmitting(false);
            }}
          >
            undo
          </Button>
        }
        onClose={() => {
          alert(JSON.stringify(readyData));
          setIsSubmitting(false);
          setReadyData({} as UserValues);
        }}
      />
      <Typography variant="h5"> Update My Details</Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <form
        action=""
        onSubmit={(ev) =>
          handleSubmit(
            ev,
            () => setIsSubmitting(true),
            (value) => {
              setReadyData(value);
            },
            (reason) => setSubmissionError(reason)
          )
        }
      >
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

          <MyTextField
            label="Phone number"
            name="phoneNumber"
            initialValue={initialValues.phoneNumber}
            onChange={(ev) =>
              setInitialValues((v) => ({
                ...v,
                phoneNumber: ev.target.value as string,
              }))
            }
          />
          <PasswordField
            name="password"
            sx={{
              flexGrow: 1,
              flexBasis: "350px",
            }}
            value={initialValues.password as string}
            onChange={(ev) =>
              setInitialValues((v) => ({
                ...v,
                password: ev.target.value as string,
              }))
            }
          />

          <Button
            variant="contained"
            size="small"
            color="inherit"
            type="submit"
            disabled={
              initialValues.username === "..." ||
              !hasFormChanged(initialValuesJSON, initialValues) ||
              isSubmitting
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
            {!isSubmitting ? (
              <>Save changes</>
            ) : (
              <>
                <span style={{ marginRight: "8px" }}> Saving changes </span>
                <CircularProgress size={15} sx={{ color: "#a6a6a6" }} />
              </>
            )}
          </Button>
        </Box>
      </form>
    </>
  );
}
