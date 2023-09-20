import * as Yup from "yup";
import { ucfirst } from "../utils";

const validationSchema = Yup.object({
  firstname: Yup.string().required().min(3),
  lastname: Yup.string().required().min(3),
  username: Yup.string().required().min(3),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().required().length(11),
  password: Yup.string().required().min(8),
});

type HandleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  onSubmitAction: () => void,
  onReadyDataAction: (value: UserValues) => void,
  onSubmissionError: (reason: string) => void
) => void;

export const handleSubmit: HandleSubmit = (
  ev,
  onSubmitAction,
  onReadyDataAction,
  onSubmissionError
) => {
  ev.preventDefault();
  onSubmitAction();
  const target = ev.target as HTMLFormElement & {
    firstname: HTMLInputElement;
    lastname: HTMLInputElement;
    username: HTMLInputElement;
    email: HTMLInputElement;
    phoneNumber: HTMLInputElement;
    password: HTMLInputElement;
  };
  const body = {} as UserValues;
  body.firstname = target.firstname.value as string;
  body.lastname = target.lastname.value as string;
  body.username = target.username.value as string;
  body.email = target.email.value as string;
  body.phoneNumber = target.phoneNumber.value as string;
  body.password = target.password.value as string;

  validationSchema
    .validate(body)
    .then((value) => {
      onReadyDataAction(value);
    })
    .catch((e: Yup.ValidationError) => {
      if (e.message.startsWith("phoneNumber")) {
        return onSubmissionError("Phone number must be at most 11 characters");
      }
      onSubmissionError(ucfirst(e.message));
    });
};
