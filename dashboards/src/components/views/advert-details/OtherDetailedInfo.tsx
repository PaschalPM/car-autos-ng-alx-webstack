import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { carAdverts } from "../../../libs/faker/adverts";

const Section = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <Box flex={1}>
      <Typography variant="subtitle2" fontSize={"1em"}>
        {value}
      </Typography>
      <Typography variant="overline" fontSize={".70em"}>
        {title}
      </Typography>
    </Box>
  );
};
type Props = {
  advert: (typeof carAdverts)[0];
};

export default function OtherDetailedInfo({ advert }: Props) {
  return (
    <>
      <Stack direction="row" justifyContent={"space-between"} my={3}>
        <Section title="Brand" value={advert.brand} />
        <Section title="Model" value={advert.model} />
      </Stack>
      <Stack direction="row" justifyContent={"space-between"}>
        <Section title="Year" value={advert.year} />
        <Section title="Fuel Type" value={advert.fuelType} />
      </Stack>
    </>
  );
}
