import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import MyAlert from "../components/prompts/MyAlert";
import Save from "@mui/icons-material/Save";
import MyTextField from "../components/formFields/MyTextField";
import { baseColor } from "../libs/utils";
import { useState } from "react";
import { hasFormChanged } from "../libs/utils";
import useAppStore from "../store/app";
import UpdatePasswordModal from "../components/views/UpdatePasswordModal";
import { userDetailValidationSchema, fields } from "../libs/snippets/myDetails";
import { Formik, FormikConfig, FormikProps, Form } from "formik";
import SubHeader from "../components/typography/SubHeader";
import MySnackbar from "../components/prompts/MySnackbar";


export default function MyDetails() {
  const userProfile = useAppStore((state) => state.userProfile);
  const openSnackbar = useAppStore((state) => state.openSnackbar)
  const resetSnackbar = useAppStore((state) => state.resetSnackbar)
  const openAlert = useAppStore((state) => state.openAlert)
  const resetAlert = useAppStore((state) => state.resetAlert)

  const [isPasswordModalOpen, setisPasswordModalOpen] = useState(false);
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

      const handleCloseSnackbar = () => {
        console.log(values);
        openAlert("User editted successfully", resetAlert, "success")
        formikHelpers.setSubmitting(false);
        resetSnackbar()
      }
     const actionCb = () => {
      formikHelpers.setSubmitting(false);
        resetSnackbar()
     }
      openSnackbar('Submitting changes...', actionCb, handleCloseSnackbar)
      
    },
  };

  return (
    <>
      <Typography variant="h6"> My Details</Typography>
      <Divider sx={{ mb: 3 }} />
      <SubHeader sx={{ mb: 1 }}> Update Profile </SubHeader>
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
      <MyAlert/>
      <MySnackbar/>
    </>
  );
}
