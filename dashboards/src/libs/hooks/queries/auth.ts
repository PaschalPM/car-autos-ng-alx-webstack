import { useMutation } from "react-query";
import { axiosClient } from "../../requests/@config";

type LoginRequest = {
  username: string;
  password: string;
};
const loginRequest = (data: LoginRequest) => axiosClient.post("/login", data);
const refreshTokenRequest = (data: { refresh: string }) => axiosClient({
  method: 'POST',
  url: '/token/refresh',
  data
});

export const useLoginUserMutation = () => useMutation(loginRequest);
export const useRefreshTokenMutation = () => useMutation(refreshTokenRequest)
