import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BsClock } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { carAdverts } from "../../../libs/faker/adverts";
import dayjs from 'dayjs';

const formattedDate = (dateString: string) => {
    const currentDate = dayjs(dateString);
    return currentDate.format('DD/MM/YY');
}

type Props = {
  advert: (typeof carAdverts)[0];
};

export default function CreationStateInfo({ advert }: Props) {
  return (
    <Stack direction="row" spacing={4} alignItems={"center"}>
      <Stack direction="row" alignItems={"center"} spacing={0.75}>
        <BsClock />
        <Typography variant='caption'>{formattedDate(advert.created_at)}</Typography>
      </Stack>
      <Stack direction="row" alignItems={"center"} spacing={0.75}>
        <FaLocationDot />
        <Typography variant='caption'>{advert.state}/{advert.city}</Typography>
      </Stack>
    </Stack>
  );
}
