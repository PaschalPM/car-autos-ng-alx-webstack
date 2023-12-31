import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const baseURL = import.meta.env.VITE_BASE_URL;

export const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
// export const cloudinaryURL = `https://api.cloudinary.com/v1_1/demo/image/upload`

export const axiosClient = axios.create({
  baseURL: baseURL ?? "http://localhost:5500/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosPrivateClient = axios.create({
  baseURL: baseURL ?? "http://localhost:5500/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxiosInceptor = () => {
  axiosClient.interceptors.request.use(async (config) => {
    if (!config.url?.includes("/token/refresh")) {
      const refreshToken = localStorage.getItem("refresh-token");
      if (refreshToken) {
        try {
          const res = await axiosPrivateClient({
            method: "POST",
            url: "/token/refresh",
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
            data:{refresh: refreshToken}
          });
          const data = (await res.data) as { access: string };
          config.headers.set("Authorization", `Bearer ${data.access}`);
        } catch (e) {
          console.log(e);
        }
      }
    }
    return config;
  });
};
