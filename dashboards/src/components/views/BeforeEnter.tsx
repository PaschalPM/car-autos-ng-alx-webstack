import { PropsWithChildren } from "react";
import useAuthUserProfile from "../../store/auth-user";
import useAuthJWTToken from "../../store/jwt-token";
import { extractUserProfileFromJWT } from "../../libs/utils";
import { useEffect, useState } from "react";
import BeforeEnterFeedback from "./BeforeEnterFeedback";
import { useRefreshTokenMutation } from "../../libs/hooks/queries/auth";

export default function BeforeEnter({ children }: PropsWithChildren) {
  const userjwttoken = useAuthJWTToken((state) => state.userjwttoken);
  const setUserJWTToken = useAuthJWTToken((state) => state.setUserJWTToken);
  const setUserProfile = useAuthUserProfile((state) => state.setUserProfile);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const { mutate } = useRefreshTokenMutation();

  useEffect(() => {
    if (!userjwttoken) {
      const refreshToken = localStorage.getItem("refresh-token");
      if (refreshToken) {
        mutate(
          {
            refresh: refreshToken,
          },
          {
            onSuccess: (data) => {
              setUserJWTToken((data.data as { access: string }).access);
              setIsAuthenticating(false);
              setIsAuth(true);
            },
            onError: (reason) => {
              setIsAuthenticating(false);
              setIsAuth(false);
              console.log(reason);
            },
          }
        );
      } else {
        setIsAuthenticating(false);
        setIsAuth(false);
      }
    } else {
      setIsAuthenticating(false);
      setIsAuth(true);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userjwttoken) {
      setUserProfile(extractUserProfileFromJWT(userjwttoken));
    }
    // eslint-disable-next-line
  }, [userjwttoken]);

  return (
    <BeforeEnterFeedback isAuthenticating={isAuthenticating} isAuth={isAuth}>
      {children}
    </BeforeEnterFeedback>
  );
}
