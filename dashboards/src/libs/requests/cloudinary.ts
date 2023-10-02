import { cloudinaryURL } from "./@config";
const apiKey = import.meta.env.VITE_CLOUD_API_KEY;
const abortController = new AbortController()
const abortSignal = abortController.signal
const timeoutDuration = 10000


export const postToCloud = async (
  imgObj: ImageWithPreview,
  handleSuccess: (data: CloudinaryResponse) => void,
  handleError: (reason: string) => void
) => {
  const formData = new FormData();
  formData.append("file", imgObj.file);
  formData.append("upload_preset", "car_adverts");
  formData.append("api_key", apiKey);
  formData.append("public_id", `${imgObj.file.name}.${imgObj.file.size}`);

  const res = await fetch(cloudinaryURL, {
    method: "POST",
    body: formData,
    signal: abortSignal
  });

  try {
    if (!res.ok) throw new Error("Network Error");
    const data = (await res.json()) as CloudinaryResponse;
    if (data.existing) throw new Error(`${imgObj.file.name} already exists`);
    handleSuccess(data);
  } catch (e) {
    console.log(e)
    handleError(String(e));
  }

  setTimeout(()=>{
    abortController.abort()
  }, timeoutDuration)
};
