import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
import Logout from "@mui/icons-material/Logout";
import { FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { GiVibratingSmartphone } from "react-icons/gi";
import { RiLockPasswordLine } from "react-icons/ri";
import { TiGroupOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import SubHeader from "../../components/typography/SubHeader";

import useAppStore from "../../store/app";
import { urlPath } from "../../libs/utils";

const Item = ({ Icon, text }: { Icon: React.ReactNode; text: string }) => (
  <Box
    sx={{
      display: "flex",
      gap: 1,
      alignItems: "center",
      color: "#444",
    }}
  >
    <Box>{Icon}</Box>
    <Typography variant={"body1"} gutterBottom>
      {text}
    </Typography>
  </Box>
);

type MyLinkButtonProps = React.PropsWithChildren & {
  to: string;
  variant: "outlined" | "contained";
  startIcon: React.ReactNode;
  color: "success" | "error" | "secondary" | "primary";
  handleClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};
const MyLinkButton = ({
  children,
  to,
  color,
  variant,
  startIcon,
  handleClick,
}: MyLinkButtonProps) => (
  <MuiLink
    component={Link}
    to={to}
    onClick={(ev) => {
      handleClick && handleClick(ev);
    }}
  >
    <Button
      size="large"
      variant={variant}
      color={color}
      startIcon={startIcon}
      sx={{ width: "100%" }}
    >
      {children}
    </Button>
  </MuiLink>
);
export default function MyProfile() {
  const userProfile = useAppStore((state) => state.userProfile);
  const logout = useAppStore((state) => state.logout);
  const openSnackbar = useAppStore((state) => state.openSnackbar);
  const resetSnackbar = useAppStore((state) => state.resetSnackbar);
  const openAlert = useAppStore((state) => state.openAlert);
  const setPageTitle = useAppStore((state) => state.setPageTitle);

  const navigate = useNavigate();

  useEffect(() => {
    setPageTitle("My Profile");
    // eslint-disable-next-line
  }, []);

  const handleLogout: React.MouseEventHandler<HTMLAnchorElement> | undefined = (
    ev
  ) => {
    ev.preventDefault();
    openSnackbar(
      "Logging out.",
      () => {
        resetSnackbar();
      },
      () => {
        openAlert(
          "Logged out.",
          () => {
            navigate("/");
            logout();
          },
          "success"
        );
      }
    );
  };
  return (
    <Container disableGutters>
      <Stack
        direction={"row"}
        gap={4}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        <Box flex={1} flexBasis={"500px"} flexGrow={10}>
          <Paper elevation={4} sx={{ p: 2 }}>
            <Container>
              <SubHeader>
                {userProfile.firstname} {userProfile.lastname}
              </SubHeader>

              <Item Icon={<FiUser />} text={userProfile.username} />
              <Item Icon={<AiOutlineMail />} text={userProfile.email} />
              <Item
                Icon={<GiVibratingSmartphone />}
                text={userProfile.phoneNumber}
              />
              <Item Icon={<RiLockPasswordLine />} text={"**********"} />
              <Item
                Icon={<TiGroupOutline />}
                text={userProfile.isManager ? "manager" : "marketer"}
              />
              <Divider sx={{ marginBottom: "1em" }} />
              <Typography gutterBottom color={"#444"}>
                Date of Registration: 2 weeks ago
              </Typography>
            </Container>
          </Paper>
        </Box>
        <Box
          flex={1}
          display={"flex"}
          sx={{ minHeight: "225px" }}
          flexDirection={"column"}
          justifyContent={"space-around"}
          flexBasis={"250px"}
        >
          <MyLinkButton
            to="edit"
            variant="outlined"
            color="success"
            startIcon={<Edit />}
          >
            Edit Profile
          </MyLinkButton>

          <MyLinkButton
            to={urlPath("my-marketers:new")}
            color="primary"
            variant="outlined"
            startIcon={<Add />}
          >
            Add Marketer
          </MyLinkButton>
          <MyLinkButton
            to={urlPath("my-adverts:new")}
            variant="outlined"
            color="secondary"
            startIcon={<Add />}
          >
            Add Advert
          </MyLinkButton>
          <MyLinkButton
            to={"/"}
            variant="contained"
            color="error"
            startIcon={<Logout />}
            handleClick={handleLogout}
          >
            Logout
          </MyLinkButton>
        </Box>
      </Stack>
    </Container>
  );
}
