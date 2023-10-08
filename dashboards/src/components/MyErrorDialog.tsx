import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import useDialogStore from "../store/dialog";

const MainErrorDialog = ({
  open,
  title,
  description,
  imgSrc,
  textCenter,
  handleClose,
  index,
}: DialogType & { index: number }) => {
  return (
    <Dialog
      open={open as boolean}
      onClose={() => handleClose && handleClose(index)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title" textAlign={textCenter ? "center" : "left"}>
        {title}
      </DialogTitle>
      <DialogContent>
        {imgSrc && (
          <Box width={"100px"} height={"100px"} m={"auto"} my={2}>
            <img
              src={imgSrc}
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "cover" }}
            />
          </Box>
        )}
        <DialogContentText
          textAlign={textCenter ? "center" : "left"}
          id="dialog-description"
        >
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose && handleClose(index)}> ok </Button>
      </DialogActions>
    </Dialog>
  );
};

const MyErrorDialog = () => {
  const dialogs = useDialogStore((state) => state.dialogs);

  return (
    <>
      {dialogs.map((props, idx) => (
        <MainErrorDialog key={idx} {...props} index={idx} />
      ))}
    </>
  );
};
export default MyErrorDialog;
