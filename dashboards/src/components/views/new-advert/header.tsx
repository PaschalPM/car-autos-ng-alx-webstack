import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import useCloudImagesStore from "../../../store/cloudImages";

const ResetButton = () => {
  const resetAcceptedImages = useCloudImagesStore(
    (state) => state.resetAccepedImages
  );

  return (
    <Button
      size="small"
      sx={{ position: "absolute", top: 7, right: 7 }}
      type="reset"
      onClick={() => {
        resetAcceptedImages();
      }}
    >
      clear
    </Button>
  );
};

const PostAdvertTitle = () => (
  <Typography variant="h6" textAlign={"center"} py={1}>
    Post Ad
  </Typography>
);

export default function Header() {
  return (
    <Paper sx={{ position: "relative", mb: 2 }}>
      <PostAdvertTitle />
      <ResetButton />
    </Paper>
  );
}
