import { SxProps, Theme, Button, CircularProgress } from "@mui/material";
import { FormikProps } from "formik";
import { baseColor } from "../libs/utils";

export default function MyButtonWithSpinner<T>({
  text,
  suspenseText,
  formik,
  sx,
  size,
  startIcon,
  endIcon,
  fullWidth,
  type,
}: {
  text: string;
  formik: FormikProps<T>;
  sx?: SxProps<Theme> | undefined;
  suspenseText: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  size?: "small" | "medium" | "large" | undefined;
}) {
  return (
    <Button
      variant="contained"
      size={size}
      color="inherit"
      fullWidth={fullWidth}
      type={type}
      disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
      sx={{
        ...sx,
        background: baseColor,
        color: "#fff",
        "&:hover": {
          background: baseColor,
        },
      }}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {!formik.isSubmitting ? (
        <> {text} </>
      ) : (
        <>
          <span style={{ marginRight: "8px" }}> {suspenseText} </span>
          <CircularProgress size={15} sx={{ color: "#a6a6a6" }} />
        </>
      )}
    </Button>
  );
}
