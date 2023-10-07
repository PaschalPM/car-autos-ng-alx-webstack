import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Edit from "@mui/icons-material/Edit";
import Add from "@mui/icons-material/Add";
import Logout from "@mui/icons-material/Logout";
import { FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { GiVibratingSmartphone } from "react-icons/gi";
import { RiLockPasswordLine } from "react-icons/ri";
import { TiGroupOutline } from "react-icons/ti";
import SubHeader from "../../typography/SubHeader";
import { Link } from "react-router-dom";
import { humanReadableRelativeTime, urlPath } from "../../../libs/utils";
import useLogout from "../../../libs/hooks/logout";

const Item = ({ Icon, text }: { Icon: React.ReactNode; text: string }) => (
  <Box display="flex" alignItems={"center"} gap={1}>
    <Box>{Icon}</Box>
    <Typography variant={"body1"} gutterBottom>
      {text}
    </Typography>
  </Box>
);

type MyLinkButtonProps = React.PropsWithChildren & {
  to: string;
  state?: object;
  variant: "outlined" | "contained";
  startIcon: React.ReactNode;
  color: "success" | "error" | "secondary" | "primary" | "info";
  handleClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};
const MyLinkButton = ({
  children,
  to,
  color,
  variant,
  startIcon,
  state,
  handleClick,
}: MyLinkButtonProps) => (
  <Link
    to={to}
    state={state}
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
  </Link>
);

type Props = {
  userProfile: UserValues;
  isAuth: boolean;
};

export default function UserProfile({ userProfile, isAuth }: Props) {
  const handleLogout = useLogout();
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
                text={userProfile.isManager ? "Manager" : "Marketer"}
              />
              <Divider sx={{ marginBottom: "1em" }} />
              <Typography gutterBottom>
                Date of Registration:
                {" " +
                  humanReadableRelativeTime(userProfile.createdAt as string)}
              </Typography>
            </Container>
          </Paper>
        </Box>
        <Box
          flex={1}
          display={"flex"}
          sx={{ minHeight: "225px" }}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          flexBasis={"250px"}
        >
          <MyLinkButton
            to="edit"
            variant="outlined"
            color="info"
            state={{ userProfile }}
            startIcon={<Edit />}
          >
            Edit Profile
          </MyLinkButton>
          {userProfile.isManager && (
            <>
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
                state={{ marketerId: userProfile.id }}
                variant="outlined"
                color="secondary"
                startIcon={<Add />}
              >
                Add Advert
              </MyLinkButton>
            </>
          )}
          {isAuth && (
            <MyLinkButton
              to={"/"}
              variant="contained"
              color="error"
              startIcon={<Logout />}
              handleClick={handleLogout}
            >
              Logout
            </MyLinkButton>
          )}
        </Box>
      </Stack>
    </Container>
  );
}
