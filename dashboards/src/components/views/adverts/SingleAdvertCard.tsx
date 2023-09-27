import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { carAdverts } from "../../../libs/faker/adverts";
import { Link } from "react-router-dom";
import MySwitch from "../../formFields/MySwitch";
import IconButton from "@mui/material/IconButton";
import { BsTrash } from "react-icons/bs";
import { snippet, formatNaira } from "../../../libs/utils";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { urlPath } from "../../../libs/utils";


type CardProps<T> = {
  data: T;
  isMdMQ?: boolean;
  isLgMQ?: boolean;
};

function CustomizedCard({
  data,
  isMdMQ,
  isLgMQ,
}: CardProps<(typeof carAdverts)[0]>) {
  const style = {
    imgSize: "70px",
    titleSize: ".9em",
    otherSize: ".75em",
    deleteSize: 15,
  };
  const theme = useTheme();

  if (isMdMQ) {
    style.imgSize = "120px";
    style.titleSize = "1.2em";
    style.otherSize = "1em";
    style.deleteSize = 20;
  }

  if (isLgMQ) {
    style.imgSize = "150px";
    style.titleSize = "1.3em";
    style.otherSize = "1.1em";
    style.deleteSize = 22;
  }

  return (
    <Card sx={{ my: 2 }}>
      <Box display={isLgMQ ? "flex" : ""} justifyContent={"space-between"}>
        <Link to={urlPath(`my-adverts:${data.id}`)} style={{ flex:1 }}>
          <Stack
            direction="row"
            spacing={0.5}
            pt={0.5}
            position={"relative"}
          >
            <CardMedia
              component="img"
              alt="Sample Image"
              image={data.thumbnail}
              title="Sample Image"
              loading="lazy"
              sx={{
                p: 1,
                width: style.imgSize,
                height: style.imgSize,
                objectFit: "cover",
                mt: 1,
                mb: -2,
              }}
            />

            <Box
              display="flex"
              position={"absolute"}
              gap={0.5}
              bottom={10}
              left={5}
            >
              <PhotoCameraIcon />
              <Typography> {data.images.length} </Typography>
            </Box>
            <Box flex="1" sx={{ mt: 2, pt: 0.5 }}>
              <Typography gutterBottom sx={{ fontSize: style.titleSize }}>
                {snippet(data.title)}
              </Typography>
              <Typography sx={{ fontSize: style.otherSize }}>
                {formatNaira(parseInt(data.price))}
              </Typography>
              <Typography
                sx={{ fontSize: style.otherSize }}
                color={data.isActive ? "primary.light" : "secondary.main"}
              >
                {data.isActive ? "Active" : "Inactive"}
              </Typography>
            </Box>
          </Stack>
        </Link>
        <Box
          display="flex"
          flexDirection={isLgMQ ? "column" : "row"}
          alignItems={isLgMQ ? "flex-start" : ""}
          justifyContent="center"
          gap={3}
          px={1}
        >
          <MySwitch
            label=""
            initialCheckState={data.isActive}
            handleChange={() => {}}
          />
          <IconButton>
            <BsTrash color={theme.palette.error.main} size={style.deleteSize} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}

type Props = {
  carAdvert: (typeof carAdverts)[0];
};
export default function SingleAdvertCard({ carAdvert }: Props) {
  const theme = useTheme();
  const xsMatch = useMediaQuery(theme.breakpoints.up("xs"));
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));
  const lgMatch = useMediaQuery(theme.breakpoints.up("lg"));

  if (lgMatch) return <CustomizedCard data={carAdvert} isLgMQ={true} />;
  if (mdMatch) return <CustomizedCard data={carAdvert} isMdMQ={true} />;
  if (xsMatch) return <CustomizedCard data={carAdvert} />;
}
