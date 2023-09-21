import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Edit from "@mui/icons-material/Edit";

import { baseColor, urlPath } from "../../../libs/utils";
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
      color: "#444",
    }}
  >
    <Box>{Icon}</Box>
    <Typography variant={"caption"}> {text} </Typography>
  </Box>
);
export default function MyDetails() {
  const state = useAppStore((state) => state.userProfile);
  return (
    <Card>
      <CardContent>
        <SubHeader>My Details</SubHeader>
        <Typography gutterBottom sx={{ color: "#444" }}>
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
          color="inherit"
          sx={{
            backgroundColor: baseColor,
            color: "#fff",
            mt: 1,
            "&:hover": {
              backgroundColor: baseColor,
            },
          }}
          startIcon={<Edit />}
        >
          <Link to={urlPath("My Details")}>Edit details</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
