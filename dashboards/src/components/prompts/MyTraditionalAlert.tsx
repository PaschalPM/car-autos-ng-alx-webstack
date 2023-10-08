import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

type Props = Alert & { title: string };
export default function MyTraditionalAlert({
  isOpen,
  severity,
  message,
  title,
  handleClose,
}: Props) {
  return (
    <Stack
      sx={{ width: "calc(100% - 7em)" }}
      position={"fixed"}
      top={70}
      zIndex={1000}
      spacing={2}
      my={2}
    >
      <Collapse in={isOpen}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => handleClose && handleClose()}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          variant="filled"
          severity={severity}
        >
          <AlertTitle>{title}</AlertTitle>
          <Typography variant="subtitle2">{message}</Typography>
        </Alert>
      </Collapse>
    </Stack>
  );
}
