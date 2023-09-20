import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MyAlert from "../components/MyAlert";

import Save from "@mui/icons-material/Save";

import MyTextField from "../components/MyTextField";
import { baseColor } from "../libs/utils";
import { useState } from "react";
import { hasFormChanged } from "../libs/utils";
import useAppStore from "../store/app";
import UpdatePasswordModal from "../components/views/UpdatePasswordModal";
import { userDetailValidationSchema, fields } from "../libs/snippets/myDetails";

import { Formik, FormikConfig, FormikProps, Form } from "formik";

export default function MyDetails() {
  const userProfile = useAppStore((state) => state.userProfile);
  const [isPasswordModalOpen, setisPasswordModalOpen] = useState(false);
  const [submitAlertState, setSubmitAlertState] = useState({} as Alert);
  const formikConfig: FormikConfig<UserValues> = {
    initialValues: {
      firstname: userProfile.firstname,
      lastname: userProfile.lastname,
      username: userProfile.username,
      email: userProfile.email,
      phoneNumber: userProfile.phoneNumber,
    },
    validationSchema: userDetailValidationSchema,
    onSubmit(values, formikHelpers) {
      setTimeout(() => {
        console.log(values);
        setSubmitAlertState({
          isOpen: true,
          message: "User editted successfully",
        });
        formikHelpers.setSubmitting(false);
      }, 2000);
    },
  };

  return (
    <>
      <Typography variant="h5"> My Details</Typography>
      <Divider sx={{ marginBottom: 3 }} />
      <Typography variant="h6" sx={{ color: baseColor, marginBottom:1 }}> Update Profile </Typography>
      <Formik {...formikConfig}>
        {(formik: FormikProps<UserValues>) => (
          <Form>
            <Paper
              sx={{
                display: "flex",
                flexWrap: "wrap",
                columnGap: 6,
                rowGap: 2,
                px: 1,
                p: 2,
              }}
            >
              {fields.map(({ name, label, type }) => (
                <MyTextField
                  initialValue={formik.values}
                  key={name}
                  name={name}
                  label={label}
                  type={type}
                  required={true}
                  sx={{
                    flexGrow: 1,
                    flexBasis: "350px",
                    marginBottom: 1,
                  }}
                />
              ))}
              <MyTextField
                label="Group"
                initialValue={formik.values}
                name="group"
                value={userProfile.isManager ? "Manager" : "Marketer"}
                sx={{
                  flexGrow: 1,
                  flexBasis: "350px",
                  marginBottom: 1,
                }}
                disabled={true}
              />
              <Button
                variant="contained"
                color="inherit"
                size="large"
                disabled={
                  !hasFormChanged(userProfile, {
                    ...formik.values,
                    isManager: userProfile.isManager,
                  }) ||
                  !formik.isValid ||
                  formik.isSubmitting
                }
                type="submit"
                sx={{
                  backgroundColor: baseColor,
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: baseColor,
                  },
                }}
                startIcon={<Save />}
              >
                {!formik.isSubmitting ? (
                  <>Save changes</>
                ) : (
                  <>
                    <span style={{ marginRight: "8px" }}> Saving changes </span>
                    <CircularProgress size={15} sx={{ color: "#a6a6a6" }} />
                  </>
                )}
              </Button>
              <Button
                variant="text"
                size="small"
                color="secondary"
                onClick={() => setisPasswordModalOpen(true)}
              >
                Edit password
              </Button>
            </Paper>
          </Form>
        )}
      </Formik>
      <UpdatePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setisPasswordModalOpen(false)}
      />
      <MyAlert
        message={submitAlertState.message}
        isOpen={submitAlertState.isOpen}
        severity={submitAlertState.severity}
        onClose={() => setSubmitAlertState({} as Alert)}
      />
    </>
  );
}
