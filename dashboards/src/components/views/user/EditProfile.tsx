import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import MyAlert from "../../prompts/MyAlert";
import Save from "@mui/icons-material/Save";
import MyTextField from "../../formFields/MyTextField";
import { useState } from "react";
import { hasFormChanged } from "../../../libs/utils";
import useAppStore from "../../../store/app";
import UpdatePasswordModal from "../UpdatePasswordModal";
import {
  userDetailValidationSchema,
  fields,
} from "../../../libs/snippets/myDetails";
import { Formik, FormikConfig, FormikProps, Form } from "formik";
import SubHeader from "../../typography/SubHeader";
import MySnackbar from "../../prompts/MySnackbar";

type Props = {
  userProfile: UserValues;
};
export default function EditProfile({ userProfile }: Props) {
  const openSnackbar = useAppStore((state) => state.openSnackbar);
  const resetSnackbar = useAppStore((state) => state.resetSnackbar);
  const openAlert = useAppStore((state) => state.openAlert);
  const resetAlert = useAppStore((state) => state.resetAlert);

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
        openAlert("User editted successfully", resetAlert, "success");
        formikHelpers.setSubmitting(false);
        resetSnackbar();
      };
      const actionCb = () => {
        formikHelpers.setSubmitting(false);
        resetSnackbar();
      };
      openSnackbar("Submitting changes...", actionCb, handleCloseSnackbar);
    },
  };

  const extractFormKeyValues = (
    userProfile: UserValues
  ): Pick<
    UserValues,
    "firstname" | "lastname" | "username" | "email" | "phoneNumber"
  > => {
    return {
      firstname: userProfile.firstname,
      lastname: userProfile.lastname,
      username: userProfile.username,
      email: userProfile.email,
      phoneNumber: userProfile.phoneNumber,
    };
  };
  return (
    <>
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
                pt: 3,
              }}
            >
              {fields.map(({ name, label, type }) => (
                <MyTextField
                  initialValues={formik.values}
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
                initialValues={formik.values}
                name="group"
                value={userProfile.isManager ? "Manager" : "Marketer"}
                sx={{
                  flexGrow: 1,
                  flexBasis: "350px",
                  marginBottom: 1,
                }}
                disabled={true}
              />
              <Stack width="400px" direction={"row"} spacing={2}>
                <Button
                  variant="contained"
                  color="inherit"
                  size="large"
                  disabled={
                    !hasFormChanged(
                      extractFormKeyValues(userProfile),
                      formik.values
                    ) ||
                    !formik.isValid ||
                    formik.isSubmitting
                  }
                  type="submit"
                  startIcon={<Save />}
                >
                  {!formik.isSubmitting ? (
                    <>Save changes</>
                  ) : (
                    <>
                      <span style={{ marginRight: "8px" }}>Saving changes</span>
                      <CircularProgress size={15} />
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
              </Stack>
            </Paper>
          </Form>
        )}
      </Formik>
      <UpdatePasswordModal
        open={isPasswordModalOpen}
        onClose={() => setisPasswordModalOpen(false)}
      />
      <MyAlert />
      <MySnackbar />
    </>
  );
}
