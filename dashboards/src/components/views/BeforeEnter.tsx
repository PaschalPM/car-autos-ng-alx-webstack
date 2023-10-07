import { PropsWithChildren } from "react";
import useAuthUserProfile from "../../store/auth-user";
import useAuthJWTToken from "../../store/jwt-token";
import jwt from "jwt-decode";
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
      mutate(
        {},
        {
          onSuccess: (data) => {
            setUserJWTToken((data.data as { access: string }).access);
            setIsAuthenticating(false);
            setIsAuth(true);
          },
          onError: () => {
            setIsAuthenticating(false);
            setIsAuth(false);
          },
        }
      );
    } else {
      setIsAuthenticating(false)
      setIsAuth(true)
    }
  }, []);

  useEffect(() => {
    if (userjwttoken) {
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
      } = jwt(userjwttoken) as ServerUser & { user_id: string };
      const userProfile = {
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
      setUserProfile(userProfile);
    }
  }, [userjwttoken]);

  return (
    <BeforeEnterFeedback isAuthenticating={isAuthenticating} isAuth={isAuth}>
      {children}
    </BeforeEnterFeedback>
  );
}
