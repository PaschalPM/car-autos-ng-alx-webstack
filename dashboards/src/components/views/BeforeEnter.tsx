import { PropsWithChildren } from "react";
import useAuthUserProfile from "../../store/auth-user";
import useAuthJWTToken from "../../store/jwt-token";

export default function BeforeEnter({ children }: PropsWithChildren) {
  const userjwttoken = useAuthJWTToken((state) => state.userjwttoken)
  const setUserProfile = useAuthUserProfile((state) => state.setUserProfile)

  const [username, password] = userjwttoken.split("-");

  // if (password === "12345678") {
  //   if (username === "pasmac") {
  //     setUserProfile({
  //       firstname: "Paschal",
  //       lastname: "Okafor",
  //       email: "okaforpaschal018@gmail.com",
  //       phoneNumber: "07031102089",
  //       username: "pasmac",
  //       isManager: true,
  //     });
  //   } else {
  //     setUserProfile({
  //       firstname: "John",
  //       lastname: "Doe",
  //       email: "johndoe@gmail.com",
  //       phoneNumber: "09034567789",
  //       username,
  //       isManager: false,
  //     });
  //   }
  // }

  setUserProfile({
    id: "pasmac1234",
    firstname: "Paschal",
    lastname: "Okafor",
    email: "okaforpaschal018@gmail.com",
    phoneNumber: "07031102089",
    username: "pasmac",
    isManager: true,
    createdAt: "2023-10-05 14:30:45.123456"
  });
  // if (password === "12345678") return children;
  return children;
  // return <UnauthorizedPage />;
}
