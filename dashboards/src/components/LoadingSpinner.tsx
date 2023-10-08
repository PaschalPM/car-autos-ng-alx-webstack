import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingSpinner({
  condition,
  size,
}: {
  condition: boolean;
  size?: number;
}) {
  return (
    <>
      {condition ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={size? size: 50} />
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
