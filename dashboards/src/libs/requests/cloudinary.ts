import { cloudinaryURL } from "./@config";
import axios, { isAxiosError } from "axios";
const apiKey = import.meta.env.VITE_CLOUD_API_KEY;
const timeout = 300000;

export const postToCloud = async (
  imgObj: ImageGrandObject,
  handleSuccess: (data: CloudinaryResponse) => void,
  handleError: (reason: string) => void
) => {
  const formData = new FormData();
  formData.append("file", imgObj.file);
  formData.append("upload_preset", "car_adverts");
  formData.append("api_key", apiKey);
  formData.append("public_id", `${imgObj.file.name}.${imgObj.file.size}`);

  try {
    const res = await axios<CloudinaryResponse>({
      method: "POST",
      url: cloudinaryURL,
      data: formData,
      timeout,
    });

    const data = res.data;
    if (data.existing) throw new Error(`${imgObj.file.name} already exists!`);
    handleSuccess(data);
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.code === "ECONNABORTED") {
        handleError(`${imgObj.file.name} took too long to upload!`);
      } else {
        handleError(e.message);
      }
    } else {
      handleError(String(e));
    }
  }
};
