import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FormikProps } from "formik";

export default function MyButtonWithSpinner<T>({
  text,
  suspenseText,
  formik,
  size,
  startIcon,
  endIcon,
  fullWidth,
  type,
}: {
  text: string;
  formik: FormikProps<T>;
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
      color="primary"
      fullWidth={fullWidth}
      type={type}
      disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
   
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
