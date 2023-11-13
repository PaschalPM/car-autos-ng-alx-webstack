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
import useAuthJWTToken from "../store/jwt-token";
import { useLoginUserMutation } from "../libs/hooks/queries/auth";
import useAuthUserProfile from "../store/auth-user";
import { isAxiosError } from "axios";


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
  const openAlert = useAppStore((state) => state.openAlert);
  const resetAlert = useAppStore((state) => state.resetAlert);
  const setIsLoggedIn = useAuthUserProfile((state) => state.setIsLoggedIn)
  const setUserJWTToken = useAuthJWTToken((state) => state.setUserJWTToken);
  const navigate = useNavigate();
  const { mutate } = useLoginUserMutation();

  const formikConfig: FormikConfig<Values> = {
    initialValues: {
      username: "pasma",
      // password: "",
      password: "frontend-dev123",
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().min(8).required(),
    }),
    
    onSubmit: (values, formikHelpers) => {
      
      mutate(values, {
        onSuccess: (data) => {
          openAlert(
            "Logged in successfully",
            () => {
              setIsLoggedIn(true)
              setUserJWTToken(data.data.access);
              localStorage.setItem("refresh-token", data.data.refrsh)
              console.log(data)
              resetAlert();
              navigate("/dashboard/");
            },
            "success"
          );
        },
        onError: (reason) => {
          openAlert(
            String(isAxiosError(reason)? reason.message: "Error occured"),
            () => {
              resetAlert();
              formikHelpers.setSubmitting(false);
            },
            "error"
          );
        },
      });
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
                initialValues={formik.values}
                size="medium"
                required
              />
              <PasswordField
                label="Password"
                name="password"
                size="medium"
                initialValues={formik.values}
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
