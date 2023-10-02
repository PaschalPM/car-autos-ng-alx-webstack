type UserValues = {
  id?: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phoneNumber: string;
  password?: string;
  isManager?: boolean;
};

type Prompt = {
  isOpen: boolean;
  message: string;
};

type Alert = Prompt & {
  severity?: "error" | "success" | "warning";
  handleClose?: () => void;
};

type Snackbar = Prompt & {
  actionCb: () => void | undefined;
  onClose: () => void | undefined;
};

type CarAdvert = {
  id: string;
  title: string;
  price: string;
  isActive: boolean;
  thumbnail: string;
};

type ImageWithPreview = {
  file: File;
  preview: string;
};

type CloudinaryResponse = {
  secure_url: string;
  existing?: boolean;
  original_filename?: string;
};

type DialogType = {
  open: boolean;
  title: string;
  description: string;
  imgSrc?: string;
  textCenter?: boolean;
  handleClose?: (idx: number) => void;
};
