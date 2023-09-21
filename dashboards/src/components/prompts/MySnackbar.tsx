import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import useAppStore from "../../store/app";
import { lightColor } from "../../libs/utils";

export default function MySnackbar() {
  const { isOpen, message, actionCb, onClose } = useAppStore(
    (state) => state.snackbar
  );

  return (
    <Snackbar
      message={message}
      autoHideDuration={3000}
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      action={
        <Button
          color="inherit"
          sx={{
            color: lightColor,
          }}
          onClick={actionCb}
        >
          undo
        </Button>
      }
    />
  );
}
