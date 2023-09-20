import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";

import { baseColor } from "../../libs/utils";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <Container maxWidth="sm">
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            401 Unauthorized
          </Typography>
          <Typography variant="body1" paragraph>
            You don't have permission to access this page.
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              mr: 0.5,
              backgroundColor: baseColor,
              color: "#fff",
              "&:hover": { backgroundColor: baseColor },
            }}
            href="/"
            startIcon={<HomeIcon />}
            component={Link}
            to={"/"}
          >
            <Link to={"/"}>Return Home</Link>
          </Button>

          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
          >
            Return to Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UnauthorizedPage;
