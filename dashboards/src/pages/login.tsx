import { styled } from "@mui/system";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useAppStore from "../store/app";
import { Formik, FormikConfig, Form as FormikForm, FormikProps } from "formik";
import * as Yup from "yup";
import MyTextField from "../components/formFields/MyTextField";
import PasswordField from "../components/formFields/PasswordField";
import MyButtonWithSpinner from "../components/MyButtonWithSpinner";
import MyAlert from "../components/prompts/MyAlert";
import { useNavigate } from "react-router-dom";

const FormContainer = styled(Paper)({
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
});

const Form = styled(FormikForm)({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

type Values = {
  username: string;
  password: string;
};

const Login = () => {
  const setUserJWTToken = useAppStore((state) => state.setUserJWTToken);
  const openAlert = useAppStore((state) => state.openAlert);
  const resetAlert = useAppStore((state) => state.resetAlert);
  const navigate = useNavigate()

  const formikConfig: FormikConfig<Values> = {
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().min(8).required(),
    }),
    onSubmit: (values, formikHelpers) => {
      openAlert("Logged in successfully", ()=>{
        resetAlert()
        setUserJWTToken(`${values.username}-${values.password}`)
        navigate('/dashboard/')
      }, "success");
    },
  };

  return (
    <>
      <FormContainer elevation={3}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Formik {...formikConfig}>
          {(formik: FormikProps<Values>) => (
            <Form>
              <MyTextField
                label="Username"
                type="text"
                name="username"
                initialValue={formik.values}
                size="medium"
                required
              />
              <PasswordField
                label="Password"
                name="password"
                size="medium"
                initialValue={formik.values}
              />
              <MyButtonWithSpinner
                text="Login"
                suspenseText="Logging in"
                type="submit"
                formik={formik}
              />
            </Form>
          )}
        </Formik>
      </FormContainer>
      <MyAlert />
    </>
  );
};

export default Login;
