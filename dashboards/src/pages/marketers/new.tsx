import { useState } from "react";
import { generateRandomValue } from "../../libs/utils";
import MyTraditionalAlert from "../../components/prompts/MyTraditionalAlert";
import { copyToClipboard } from "../../libs/utils";
import formikConfig, {
  type Marketer,
} from "../../libs/form-configs/new-marketer";
import { Formik, FormikProps, Form, FormikHelpers } from "formik";
import Container from "@mui/material/Container";
import Header from "../../components/views/new-marketer/header";
import Body from "../../components/views/new-marketer/body";

const ALERT_SUCCESS_TITLE = "User Added Successfully";
const ALERT_SUCCESS_MESSAGE =
  "Note: The new user's credentials has been copied to your clipboard.";

const NewMarketer = () => {
  const [username, setUsername] = useState(generateRandomValue(10));
  const [password, setPassword] = useState(generateRandomValue(10));
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    severity: AlertSeverity;
    title: string;
    message: string;
  }>({
    isOpen: false,
    severity: "success",
    title: ALERT_SUCCESS_TITLE,
    message: ALERT_SUCCESS_MESSAGE,
  });

  const handleRegenerate = () => {
    setUsername(generateRandomValue());
    setPassword(generateRandomValue());
  };

  const handleSubmit: (
    values: Marketer,
    formikHelpers: FormikHelpers<Marketer>
  ) => void | Promise<any> = (values, formikHelpers) => {
    setTimeout(()=>{

      setAlertState((state) => ({
      ...state, isOpen: true
    }))
    const data = {...values, username, password}
    console.log(data)
    copyToClipboard(`Username: ${username}\nPassword: ${password}`);
    formikHelpers.setSubmitting(false)
    formikHelpers.resetForm()
    handleRegenerate()
    }, 2000)
  };
  return (
    <>
      <MyTraditionalAlert
        isOpen={alertState.isOpen}
        handleClose={() =>
          setAlertState((state) => ({ ...state, isOpen: false }))
        }
        severity={alertState.severity}
        title={alertState.title}
        message={alertState.message}
      />
      <Formik {...formikConfig(handleSubmit)}>
        {({ initialValues }: FormikProps<Marketer>) => (
          <Container maxWidth={"sm"} disableGutters>
            <Form>
              <Header />
              <Body
                initialValues={initialValues}
                generatedUsername={username}
                generatedPassword={password}
                handleRegenerateCreds={handleRegenerate}
              />
            </Form>
          </Container>
        )}
      </Formik>
    </>
  );
};

export default NewMarketer;
