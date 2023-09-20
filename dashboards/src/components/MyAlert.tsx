import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { SnackbarCloseReason } from "@mui/material";

const MyAlert = ({
    severity,
    message,
    isOpen,
    onClose,
  }: {
    severity?: "error" | "success" | "warning";
    message: string;
    isOpen: boolean;
    onClose:
      | ((
          event: Event | React.SyntheticEvent<typeof Alert, Event>,
          reason: SnackbarCloseReason
        ) => void)
      | undefined;
  }) => {
    return (
      <Snackbar
        open={isOpen}
        autoHideDuration={2500}
        onClose={onClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert sx={{minWidth:'300px'}} severity={severity}> {message} </Alert>
      </Snackbar>
    );
  };

  export default MyAlert