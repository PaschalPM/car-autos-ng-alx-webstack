import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
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
            404 Not Found
          </Typography>
          <Typography variant="body1" paragraph>
            The page you're looking for doesn't exist.
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              mr: 0.5,
              backgroundColor: "primary.main",
              color: "#fff",
              "&:hover": { backgroundColor: "primary.main" },
            }}
            component={Link}
            to="/"
          >
            <HomeIcon />
            Return Home
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;
