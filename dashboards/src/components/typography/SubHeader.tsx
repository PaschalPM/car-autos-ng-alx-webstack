import { SxProps, Theme, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { baseColor } from "../../libs/utils";


export default function SubHeader({ children, sx }: PropsWithChildren & {
  sx?: SxProps<Theme> | undefined
}) {
  return (
    <Typography
      variant={"h6"}
      sx={{ fontWeight: 350, color: baseColor, ...sx }}
      gutterBottom
    >
      {children}
    </Typography>
  );
}
