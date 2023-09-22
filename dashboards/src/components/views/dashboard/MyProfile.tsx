import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";

import { urlPath } from "../../../libs/utils";
import { FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { TiGroupOutline } from "react-icons/ti";
import { GiVibratingSmartphone } from "react-icons/gi";
import { Link } from "react-router-dom";
import useAppStore from "../../../store/app";
import SubHeader from "../../typography/SubHeader";

const Item = ({ Icon, text }: { Icon: React.ReactNode; text: string }) => (
  <Box
    sx={{
      display: "flex",
      gap: 1,
      alignItems: "center",
    }}
  >
    <Box>{Icon}</Box>
    <Typography variant={"caption"}> {text} </Typography>
  </Box>
);
export default function MyProfile() {
  const state = useAppStore((state) => state.userProfile);
  return (
    <Card sx={{ width:"100%" }}>
      <CardContent>
        <SubHeader>My Profile Summary</SubHeader>
        <Typography gutterBottom>
          {state.firstname} {state.lastname}
        </Typography>
        <Item Icon={<FiUser />} text={state.username} />
        <Item Icon={<AiOutlineMail />} text={state.email} />
        <Item Icon={<GiVibratingSmartphone />} text={state.phoneNumber} />
        <Item Icon={<RiLockPasswordLine />} text={"**********"} />
        <Item
          Icon={<TiGroupOutline />}
          text={state.isManager ? "manager" : "marketer"}
        />
        <Button
          variant="contained"
          size="small"
          color="secondary"
          sx={{mt:1}}
          startIcon={<Edit />}
        >
          <Link to={urlPath("my-profile:edit")}>Edit profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
