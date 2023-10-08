import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const baseURL = import.meta.env.VITE_BASE_URL;

export const cloudinaryURL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
// export const cloudinaryURL = `https://api.cloudinary.com/v1_1/demo/image/upload`

export const axiosClient = axios.create({
  baseURL: baseURL ?? "http://localhost:5500/api",
  headers:{ 
    'Content-Type': 'application/json'
  }
});

export const axiosPrivateClient = axios.create({
  baseURL: baseURL ?? "http://localhost:5500/api",
  headers:{ 
    'Content-Type': 'application/json'
  },
  withCredentials: true
});