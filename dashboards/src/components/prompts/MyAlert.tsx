import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import useAppStore from "../../store/app";

const MyAlert = () => {
const {isOpen, message, severity, handleClose} = useAppStore((state)=>state.myAlert)

    return (
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert sx={{minWidth:'300px'}} severity={severity}> {message} </Alert>
      </Snackbar>
    );
  };

  export default MyAlert