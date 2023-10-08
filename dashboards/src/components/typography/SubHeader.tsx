import { SxProps, Theme, Typography } from "@mui/material";
import { PropsWithChildren } from "react";


export default function SubHeader({ children, sx }: PropsWithChildren & {
  sx?: SxProps<Theme> | undefined
}) {
  return (
    <Typography
      variant={"h6"}
      sx={{ fontWeight: 400, color: "primary.light", ...sx }}
      gutterBottom
    >
      {children}
    </Typography>
  );
}
