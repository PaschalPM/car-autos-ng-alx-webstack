import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { carAdverts } from "../../../libs/faker/adverts";
import { Link } from "react-router-dom";
import MySwitch from "../../formFields/MySwitch";
import IconButton from "@mui/material/IconButton";
import { BsTrash } from "react-icons/bs";

const SmallScreenCard = () => {
  const theme = useTheme();
  return (
    <Card sx={{ my: 2 }}>
      <Link to="/">
        <Stack direction="row" spacing={0.5} pt={0.5}>
          <CardMedia
            component="img"
            alt="Sample Image"
            image={carAdverts[0].thumbnail}
            title="Sample Image"
            loading="lazy"
            sx={{
              p: 1,
              width: "60px",
              height: "60px",
              objectFit: "cover",
              mt: 1,
              mb:-2
            }}
          />

          <Box flex="1" sx={{ mt: 1 }}>
            <Typography gutterBottom sx={{fontSize: '.9em'}}>{carAdverts[0].title}</Typography>
            <Typography sx={{ fontSize: ".75em" }}>
              {carAdverts[0].price}
            </Typography>
            <Typography
              sx={{ fontSize: ".75em" }}
              color={
                carAdverts[0].isActive ? "primary.light" : "secondary.main"
              }
            >
              {carAdverts[0].isActive ? "Active" : "Inactive"}
            </Typography>
          </Box>
        </Stack>
      </Link>
      {/* <CardActions>
        <MySwitch
          label=""
          initialCheckState={carAdverts[0].isActive}
          handleChange={() => {}}
        />
        <IconButton>
          <BsTrash color={theme.palette.error.main} size={15} />
        </IconButton>
      </CardActions> */}
    </Card>
  );
};

const LargeScreenCard = () => {
  return "Large";
};
export default function SingleAdvertCard() {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.up("sm"));
  return <>{match ? <LargeScreenCard /> : <SmallScreenCard />}</>;
}
