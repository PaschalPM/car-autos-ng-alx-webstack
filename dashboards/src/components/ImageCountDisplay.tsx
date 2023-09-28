import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

type Props = {
    imageCount: number
}
export default function ImageCountDisplay({imageCount}:Props) {
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      position={"absolute"}
      gap={0.5}
      bottom={-5}
      left={10}
      bgcolor="#0000009c"
      borderRadius={"5px"}
      padding={0.5}
    >
      <PhotoCameraIcon fontSize="inherit" />
      <Typography fontSize={12}> {imageCount} </Typography>
    </Box>
  );
}
