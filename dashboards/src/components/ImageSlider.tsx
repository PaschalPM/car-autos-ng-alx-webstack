import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material";

const MyCarousel = styled(Carousel)({
  ".slide": {
     '&:hover': {
      cursor:'pointer'
     }
  }
})

type Props = {
  images: string[];
};

export default function ImageSlider({ images }: Props) {
  const navigate = useNavigate();

  return (
    <MyCarousel
      onClickItem={(currentIdx) =>
        navigate(`/fullscreen-image-display`, {
          state: {
            currentIdx,
            images,
          },
        })
      }
    >
      {images.map((img) => (
        <Box maxHeight={"400px"}>
          <img
            src={img}
            style={{ width: "100%", height: "400px", objectFit: "cover" }}
          />
        </Box>
      ))}
    </MyCarousel>
  );
}
