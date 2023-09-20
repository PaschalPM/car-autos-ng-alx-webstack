type UserValues = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phoneNumber: string;
  password?: string;
  isManager?: boolean;
};

type Alert = {
  isOpen: boolean,
  message: string,
  severity?: "error" | "success" | "warning"
  handleClose?: ()=>void
}