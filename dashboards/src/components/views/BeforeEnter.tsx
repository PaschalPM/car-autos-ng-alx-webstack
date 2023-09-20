import { PropsWithChildren } from "react";
import UnauthorizedPage from "./UnauthorizedPage";
import useAppStore from "../../store/app";

export default function BeforeEnter({ children }: PropsWithChildren) {
  const setUserProfile = useAppStore((state) => state.setUserProfile);

  setUserProfile({
    firstname: "Paschal",
    lastname: "Okafor",
    email: "okaforpaschal018@gmail.com",
    phoneNumber: "07031102089",
    username: "pasmac",
    isManager: true
  });
  
  const num = 1;
  if (num == 1) return children;
  return <UnauthorizedPage />;
}
