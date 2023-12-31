type ServerUser = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone_number: string;
  is_manager: boolean;
  referral_code: string | null;
  created_at: string;
  team_manager: string | null;
};

type UserValues = {
  id?: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phoneNumber: string;
  password?: string;
  isManager?: boolean;
  referralCode?: string | null;
  createdAt?: string;
  teamManager?: string | null;
};

type AlertSeverity = "error" | "success" | "warning" | "info";
type Prompt = {
  isOpen: boolean;
  message: string;
};

type Alert = Prompt & {
  severity?: AlertSeverity;
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

type ImageGrandObject = {
  file: File;
  securedURL: string;
  isSubmitted?: boolean;
};

type CloudinaryResponse = {
  secure_url: string;
  existing?: boolean;
  original_filename?: string;
};

type DialogType = {
  open?: boolean;
  title: string;
  description: string;
  imgSrc?: string;
  textCenter?: boolean;
  handleClose?: (idx: number) => void;
};

type OptionType = {
  value: string;
  text: string;
};

type BrandAndStateServerDataType = {
  id: number;
  name: string;
};

type ModelServerDataType = {
  id: number;
  brand: number;
  name: string;
};

type YearServerDataType = {
  id: number;
  year: number;
};

type CityServerDataType = {
  id: number;
  state: number;
  name: string;
};

type RecentActivity = {
  id: string;
  activity_type: string;
  activity_details: string;
  user: string;
  timestamp: string;
};