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
import { Link } from "react-router-dom";

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
  return (
    <Card>
      <CardContent>
        <Typography variant={"h6"} sx={{ fontWeight: 500, color:baseColor }} gutterBottom>
          My Details
        </Typography>
        <Typography gutterBottom sx={{ color: "#444" }}>
          Paschal Okafor
        </Typography>
        <Item Icon={<FiUser />} text={"pasmac"} />
        <Item Icon={<AiOutlineMail />} text={"okaforpaschal018@gmail.com"} />
        <Item Icon={<RiLockPasswordLine />} text={"**********"} />
        <Item Icon={<TiGroupOutline />} text={"manager"} />
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
