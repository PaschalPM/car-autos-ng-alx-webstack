import usePageTitleSetter from "../../libs/hooks/setPageTitle";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { carAdverts } from "../../libs/faker/adverts";
import ImageSlider from "../../components/ImageSlider";
import useMediaQuery from "@mui/material/useMediaQuery";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material";
import CreationStateInfo from "../../components/views/advert-details/CreationStateInfo";
import OtherDetailedInfo from "../../components/views/advert-details/OtherDetailedInfo";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import {
  contactHrefGenerator,
  dialNumber,
  formatNaira,
  urlPath
} from "../../libs/utils";
import {
  DeleteButton,
  EditButton,
  ToggleEnableDisableButton,
} from "../../components/AdvertCardButtons";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import { useNavigate } from "react-router-dom";


const whatsappHref = (whatsappNum: string) => {
  const { href } = location;
  const whatsappText = `Hello, is this car still available?\n ${href}`;
  return contactHrefGenerator(whatsappNum, whatsappText, "", true);
};

const emailHref = (emailAddress: string) => {
  const { href } = location;
  const emailText = `Hello, is this car still available?\n ${href}`;
  return contactHrefGenerator(
    emailAddress,
    emailText,
    "Inquiry About Car Availability"
  );
};

export default function CarAdvertDetails() {
  usePageTitleSetter("Advert Details")
  
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.up("md"));
  const customMatch = useMediaQuery(theme.breakpoints.between(899, 1122));
  const navigate = useNavigate();
  

  return (
    <Stack spacing={2} rowGap={4} direction={{ md: "row" }}>
      <Paper
        sx={{
          flex: 1,
          flexGrow: 1.5,
          maxWidth: () => (mdMatch ? "70%" : "100%"),
        }}
      >
        <ImageSlider images={carAdverts[0].images} />
        <Box>
          <Container>
            <Typography variant={mdMatch ? "h5" : "h6"} gutterBottom>
              {carAdverts[0].title}
            </Typography>
            <CreationStateInfo advert={carAdverts[0]} />
            <Divider sx={{ my: 2, mt: 4 }} />
            <OtherDetailedInfo advert={carAdverts[0]} />
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">{carAdverts[0].description}</Typography>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" spacing={1} alignItems={"center"} pb={1}>
              <Link
                href={whatsappHref(carAdverts[0].phoneNumber)}
                target="_blank"
              >
                <WhatsAppIcon fontSize={"large"} />
              </Link>
              <Link
                href={emailHref(carAdverts[0].email)}
                target="_blank"
                color={"secondary.main"}
              >
                <EmailIcon fontSize={"large"} />
              </Link>
            </Stack>
          </Container>
        </Box>
      </Paper>
      <Stack flex={1}>
        <Paper sx={{ mb: 2, py: 3 }}>
          <Container>
            <Typography
              variant={customMatch ? "h5" : "h4"}
              gutterBottom
              textAlign={"center"}
            >
              {formatNaira(parseInt(carAdverts[0].price))}
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => dialNumber(carAdverts[0].phoneNumber)}
            >
              Call Now
            </Button>
          </Container>
        </Paper>
        <Paper sx={{ mb: 2, py: 3 }}>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              rowGap: 2,
            }}
          >
            <EditButton isForAdDetails={true} />
            <ToggleEnableDisableButton
              isActive={carAdverts[0].isActive}
              isForAdDetails={true}
            />
            <DeleteButton isForAdDetails={true} />
          </Container>
        </Paper>
        <Paper sx={{ mb: 2, py: 3 }}>
          <Container
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              rowGap: 2,
            }}
          >
            <Button
              variant="outlined"
              size="large"
              fullWidth
              startIcon={<CreateOutlinedIcon />}
              onClick={()=>navigate(urlPath('My Adverts:new'))}
            >
              Create Advert
            </Button>
          </Container>
        </Paper>
      </Stack>
    </Stack>
  );
}
