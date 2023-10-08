import { FormikConfig, FormikHelpers } from "formik";
import * as Yup from "yup";

export type Marketer = {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
};

const formikConfig: (
  onSubmit: (
    values: Marketer,
    formikHelpers: FormikHelpers<Marketer>
  ) => void | Promise<any>
) => FormikConfig<Marketer> = (onSubmit) => ({
  initialValues: {
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  },
  validationSchema: Yup.object({
    firstname: Yup.string().min(3).required(),
    lastname: Yup.string().min(3).required(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "This is an invalid phone number")
      .min(11, "phone number must be at least 11 digits")
      .required("phone number is a required field"),
  }),
  onSubmit,
});

export default formikConfig;
