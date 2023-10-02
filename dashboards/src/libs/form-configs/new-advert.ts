import { FormikConfig } from "formik";
import * as Yup from "yup";

export type CarAdvert = {
  // user: string,
  title: string;
};

const formikConfig: FormikConfig<CarAdvert> = {
  initialValues: {
    // user: "",
    title: "",
  },
  validationSchema: Yup.object({
    // user: Yup.string().max(36).required(),
    title: Yup.string().max(60).required(),
  }),
  onSubmit(values, formikHelpers) {
    console.log(values, formikHelpers);
    alert("Submit new Advert");
  },
};

export default formikConfig;
