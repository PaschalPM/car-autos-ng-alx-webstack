import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { BsFillPeopleFill } from "react-icons/bs";
import { RiAdvertisementFill } from "react-icons/ri";
import { Link as ReactLink } from "react-router-dom";
import { urlPath } from "../../../libs/utils";
import SubHeader from "../../typography/SubHeader";
import useAppStore from "../../../store/app";

type OverviewType = {
  label: string;
  num: number;
  link: string;
  icon: React.ReactNode;
};
const overviewElements: OverviewType[] = [
  {
    label: "Total Marketers",
    num: 5,
    link: urlPath("My Marketers"),
    icon: <BsFillPeopleFill size={24} />,
  },
  {
    label: "Total Adverts",
    num: 200,
    link: urlPath("My Adverts"),
    icon: <RiAdvertisementFill size={24} />,
  },
  {
    label: "Inactive Adverts",
    num: 100,
    link: urlPath("My Adverts"),
    icon: <RiAdvertisementFill size={24} />,
  },
];

const overviewElementsGenerator = (
  isManager: boolean | undefined
): OverviewType[] => {
  if (isManager) return overviewElements;
  return overviewElements.slice(1);
};

export default function Overview() {
  const { isManager } = useAppStore((state) => state.userProfile);
  return (
    <Card sx={{ marginBottom: 2, width: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SubHeader sx={{ alignSelf: "flex-start" }}>Overview</SubHeader>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          useFlexGap
          flexWrap="wrap"
          py={2}
          px={{ sm: 3, md: 1 }}
          sx={{
            justifyContent: "space-between",
          }}
        >
          {overviewElementsGenerator(isManager as boolean).map(
            ({ label, num, link, icon }) => (
              <Paper
                key={label}
                elevation={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  p: 1.5,
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "primary.light",
                    width: "40px",
                    height: "40px",
                    borderRadius: ".5em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {icon}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    textAlign="center"
                    color="primary.dark"
                  >
                    {label}
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "900" }}
                    variant={"h4"}
                    textAlign={"center"}
                  >
                    {num}
                  </Typography>

                  <Typography variant="caption">
                    <Link
                      component={ReactLink}
                      sx={{
                        textDecoration: "none",
                        color: "secondary.main",
                        fontWeight: "600",
                      }}
                      to={link}
                    >
                      view all
                    </Link>
                  </Typography>
                </Box>
              </Paper>
            )
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
