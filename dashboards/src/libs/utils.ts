import _ from "lodash";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
import jwt from "jwt-decode";

dayjs.extend(relativeTime);

export const humanReadableRelativeTime = (dateString: string) => {
  return dayjs(dateString).fromNow()
}
export const urlPath = (uniqueText: string) => {
  const basePath = "/dashboard/";
  uniqueText = uniqueText.replace(/\s/g, "-").toLowerCase();
  if (uniqueText.includes(":")) uniqueText = uniqueText.replace(":", "/");
  if (uniqueText === "home") return "/";
  if (uniqueText === "dashboard") return basePath;
  if (uniqueText === "logout") return "";

  return basePath + uniqueText;
};

export const isPathActive = (location: string, urlPath: string) => {
  const locationPaths = location.split("/");
  const lastPath = locationPaths[locationPaths.length - 1];
  if (lastPath === "new" || lastPath === "edit") {
    locationPaths.pop();
    location = locationPaths.join("/");
  }
  return location === urlPath;
};

export const hasFormChanged = <T>(initialObj: T, newObj: T) => {
  return !_.isEqual(initialObj, newObj);
};

export const ucfirst = (str: string) =>
  str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

export const snippet = (str: string, numOfChar: number = 50) =>
  str.length >= numOfChar ? str.slice(0, numOfChar) + " ..." : str;

export function formatNaira(number: number) {
  // Ensure the number is a valid numeric value
  if (typeof number !== "number" || isNaN(number)) {
    return "Invalid Number";
  }

  // Convert the number to a string with commas for thousands separator
  const formattedNumber = number.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  });

  return formattedNumber;
}

export const contactHrefGenerator = (
  numOrEmail: string,
  textOrBody: string,
  emailSubject?: string,
  isWhatsapp?: boolean
) => {
  if (isWhatsapp)
    return `https://api.whatsapp.com/send?phone=+234${numOrEmail.slice(
      1
    )}&text=${encodeURIComponent(textOrBody)}`;

  return `mailto:${numOrEmail}?subject=${encodeURIComponent(
    emailSubject as string
  )}&body=${encodeURIComponent(textOrBody)}`;
};

export function dialNumber(phoneNumber: string) {
  // Open the phone dialer with the specified number
  window.location.href = "tel:" + phoneNumber;
}

export const generateRandomValue = (size: number = 8) => {
  // Generate random alphanumeric string for username and password
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const copyToClipboard = (value: string, cb?:()=> void) => {
  // Copy text to clipboard
  navigator.clipboard.writeText(value);
  cb && cb()
};

export const extractUserProfileFromJWT = (userjwttoken: string): UserValues =>{
  const {
    user_id,
    first_name,
    last_name,
    username,
    email,
    created_at,
    is_manager,
    phone_number,
    referral_code,
  } = jwt(userjwttoken) as ServerUser & { user_id: string }

  return {
      id: user_id,
      username,
      firstname: first_name,
      lastname: last_name,
      email,
      createdAt: created_at,
      isManager: is_manager,
      phoneNumber: phone_number,
      referralCode: referral_code,
    };
}

export const supportColor = "rgba(199, 184, 45, 0.10)";
export const lightColor = "rgb(205, 198, 121)";
