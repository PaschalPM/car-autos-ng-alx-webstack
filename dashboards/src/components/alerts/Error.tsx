import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Error({
  errorMessageState,
  handleClose,
}: {
  errorMessageState: string;
  handleClose: () => void;
}) {
  return (
    <Snackbar
      open={!!errorMessageState}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert severity="error"> {errorMessageState} </Alert>
    </Snackbar>
  );
}
