import { PropsWithChildren } from "react";
import UnauthorizedPage from "./UnauthorizedPage";
import useAppStore from "../../store/app";

export default function BeforeEnter({ children }: PropsWithChildren) {
  const userjwttoken = useAppStore((state) => state.userjwttoken);
  const setUserProfile = useAppStore((state) => state.setUserProfile);

  const [username, password] = userjwttoken.split("-");

  if (password === "12345678") {
    if (username === "pasmac") {
      setUserProfile({
        firstname: "Paschal",
        lastname: "Okafor",
        email: "okaforpaschal018@gmail.com",
        phoneNumber: "07031102089",
        username: "pasmac",
        isManager: true,
      });
    } else {
      setUserProfile({
        firstname: "John",
        lastname: "Doe",
        email: "johndoe@gmail.com",
        phoneNumber: "09034567789",
        username,
        isManager: false,
      });
    }
  }

  if (password === "12345678") return children;
  return <UnauthorizedPage />;
}
