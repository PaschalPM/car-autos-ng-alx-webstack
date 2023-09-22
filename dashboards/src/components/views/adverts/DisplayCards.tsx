import { carAdverts } from "../../../libs/faker/adverts";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import useAppStore from "../../../store/app";

export default function DisplayCards() {
  const viewActiveAd = useAppStore((state) => state.viewActiveAd);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );

  let height = "165px";
  let fontSize = 1.4;

  if (isSmallScreen) {
    height = "120px"; // Set the height for small screens
    fontSize = 1;
  } else if (isMediumScreen) {
    height = "120px"; // Set the height for large screens
    fontSize = 1;
  }

  return (
    <Stack>
      {!carAdverts.length ? (
        <Box display={"flex"} justifyContent={"center"} mt={2}>
          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            No Adverts...
          </Typography>
        </Box>
      ) : (
        carAdverts.filter((ad:CarAdvert)=>ad.isActive === viewActiveAd).map((ad: CarAdvert) => (
          <Card elevation={1} sx={{ height: "165px", my: 1 }}>
            <Link to="/">
              <Grid container sx={{ height }}>
                <Grid item xs={3} md={3}>
                  <CardMedia
                    component="img"
                    loading="lazy"
                    sx={{ height }}
                    image={ad.thumbnail}
                    alt="Live from space album cover"
                  />
                </Grid>
                <Grid item xs={9} md={7} sx={{ padding: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: `${fontSize * 1.2}em` }}
                    gutterBottom
                  >
                    {ad.title}
                  </Typography>
                  <Typography gutterBottom sx={{ fontSize: `${fontSize}em` }}>
                    {ad.price}
                  </Typography>
                  {ad.isActive ? (
                    <Typography
                      sx={{ fontSize: `${fontSize * 0.85}em` }}
                      color="green"
                    >
                      Active
                    </Typography>
                  ) : (
                    <Typography
                      sx={{ fontSize: `${fontSize * 0.85}em` }}
                      color="red"
                    >
                      Inactive
                    </Typography>
                  )}
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={2}
                  sx={{ position: "relative", padding: 2 }}
                >
                  <Link to="/login" style={{ position: "absolute", inset: 0 }}>
                    Stuff
                  </Link>
                </Grid>
              </Grid>
            </Link>
          </Card>
        ))
      )}
    </Stack>
  );
}
