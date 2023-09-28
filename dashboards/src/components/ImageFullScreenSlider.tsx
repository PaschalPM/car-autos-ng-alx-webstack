import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Box from "@mui/material/Box";
import { useLocation, Navigate } from "react-router-dom";

type LocationState = {images:string[], currentIdx:number}
export default function ImageFullScreenSlider() {
  const location = useLocation();
  const {images, currentIdx} = location.state as LocationState;

  if (!images.length) return <Navigate to="404" />;

  return (
    <Carousel
      selectedItem={currentIdx}
      showThumbs={false}
      showIndicators={false}
    >
      {images.map((img) => (
        <Box maxHeight={"100vh"}>
          <img
            src={img}
            style={{ width: "100%", height: "100vh", objectFit: "contain" }}
          />
        </Box>
      ))}
    </Carousel>
  );
}
