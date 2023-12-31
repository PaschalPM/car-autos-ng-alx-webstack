import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { carAdverts } from "../../../libs/faker/adverts";
import { Link } from "react-router-dom";
import { snippet, formatNaira } from "../../../libs/utils";
import { urlPath } from "../../../libs/utils";
import ImageCountDisplay from "../../ImageCountDisplay";
import {
  ToggleEnableDisableButton,
  DeleteButton,
  EditButton,
} from "../../AdvertCardButtons";

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
        <Link to={urlPath(`my-adverts:${data.id}`)} style={{ flex: 1 }}>
          <Stack direction="row" spacing={isLgMQ ? 1 : 0.5}>
            <Box position="relative">
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
                  mb: -2,
                }}
              />
              <ImageCountDisplay imageCount={data.images.length} />
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
          gap={1.5}
          columnGap={5}
          px={1}
          sx={{
            opacity: isLgMQ ? 0 : 1,
            transition: 'all 0.3s ease',
            "&:hover": { opacity: 1 },
          }}
        >
          <EditButton />
          <ToggleEnableDisableButton isActive={data.isActive} />
          <DeleteButton />
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
