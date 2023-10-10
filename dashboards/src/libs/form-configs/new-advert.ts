import { FormikConfig, FormikHelpers } from "formik";
import * as Yup from "yup";

export type CarAdvert = {
  user: string;
  title: string;
  brand: string;
  model: string;
  state: string;
  city: string;
  price: string;
  description: string;
};

const formikConfig: (
  initialUser: string,
  onSubmit: (
    values: CarAdvert,
    formikHelpers: FormikHelpers<CarAdvert>
  ) => void | Promise<any>
) => FormikConfig<CarAdvert> = (initialUser, onSubmit) => ({
  initialValues: {
    user: initialUser,
    title: "",
    brand: "",
    model: "",
    state: "",
    city: "",
    price: "",
    description: "",
  },
  validationSchema: Yup.object({
    user: Yup.string().max(36).required(),
    title: Yup.string().min(10).max(60).required(),
    brand: Yup.string().required(),
    model: Yup.string().required(),
    state: Yup.string().required(),
    city: Yup.string().required(),
    price: Yup.string().required(),
    description: Yup.string().min(50).max(350).required(),
  }),
  onSubmit,
});

export default formikConfig;
