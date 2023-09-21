import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import PasswordField from "../formFields/PasswordField";
import MyAlert from "../prompts/MyAlert";
import MyButtonWithSpinner from "../MyButtonWithSpinner";
import { Formik, FormikConfig, Form, FormikProps } from "formik";
import SubHeader from "../typography/SubHeader";
import useAppStore from "../../store/app";

const fields: { label: string; name: string }[] = [
  {
    label: "New Password",
    name: "newPassword",
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
  },
];

type FormType = {
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const UpdatePasswordModal = ({ open, onClose }: Props) => {
  const openAlert = useAppStore((state) => state.openAlert);
  const resetAlert = useAppStore((state) => state.resetAlert);

  const handleClose = () => {
    onClose();
  };

  const formikConfig: FormikConfig<FormType> = {
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .min(8, "new password must be at least 8 characters")
        .required("new password is a required field"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), ""], "passwords dont match")
        .required("confirm password is a required field"),
    }),
    onSubmit(values, formikHelpers) {
      setTimeout(() => {
        openAlert("Successful", resetAlert, "success");
        console.log(values);
        console.log(formikHelpers);
        handleClose();
      }, 2000);
    },
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Container maxWidth="xs">
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <SubHeader>Edit Password</SubHeader>
            <Divider sx={{ marginBottom: 2 }} />

            <Formik {...formikConfig}>
              {(formik: FormikProps<FormType>) => (
                <Form>
                  {fields.map((__field) => (
                    <PasswordField
                      initialValue={formik.values}
                      label={__field.label}
                      name={__field.name}
                      fullWidth={true}
                      key={__field.name}
                      sx={{ mb: 2 }}
                    />
                  ))}
                  <MyButtonWithSpinner
                    text="save"
                    suspenseText="saving"
                    formik={formik}
                    startIcon={<SaveIcon />}
                    fullWidth
                    type="submit"
                  />
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </Modal>
      <MyAlert />
    </>
  );
};

export default UpdatePasswordModal;
