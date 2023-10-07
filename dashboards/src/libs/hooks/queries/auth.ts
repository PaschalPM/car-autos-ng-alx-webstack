import { useMutation } from "react-query";
import { axiosPrivateClient } from "../../requests/@config";

type LoginRequest = {
  username: string;
  password: string;
};
const loginRequest = (data: LoginRequest) => axiosPrivateClient.post("/login", data);
const refreshTokenRequest = (data: {}) => axiosPrivateClient({
  method: 'POST',
  url: '/refresh-token',
  data,
  withCredentials: true
});

export const useLoginUserMutation = () => useMutation(loginRequest);
export const useRefreshTokenMutation = () => useMutation(refreshTokenRequest)
