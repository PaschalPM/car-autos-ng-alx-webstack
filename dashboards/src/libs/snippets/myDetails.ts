import * as Yup from "yup";

export const userDetailValidationSchema = Yup.object({
  firstname: Yup.string().required().min(3),
  lastname: Yup.string().required().min(3),
  username: Yup.string().required().min(3),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().matches(/^[0-9]{11}$/, 'phone number must be a digit and exactly 11').required('phone number is a required field'),
});

export const fields: { label: string; name: string; type?: string }[] = [
  {
    label: "First Name",
    name: "firstname",
  },
  {
    label: "Last Name",
    name: "lastname",
  },
  {
    label: "Username",
    name: "username",
  },
  {
    label: "Email",
    name: "email",
    type: "email"
  },
  {
    label: "Phone Name",
    name: "phoneNumber",
  },
];