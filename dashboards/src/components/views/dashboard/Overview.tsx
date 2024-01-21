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
import useAuthUserProfile from "../../../store/auth-user";
import { useCallback, useState } from "react";
import { useManagerMarketersQuery } from "../../../libs/hooks/queries/marketers";

type OverviewType = {
  label: string;
  num: number;
  link: string;
  state?: {isAdActive: boolean};
  icon: React.ReactNode;
};
const overviewElements = (
  mktrsNum: number,
  adNum: number,
  inActiveAdNum: number
): OverviewType[] => [
  {
    label: "Total Marketers",
    num: mktrsNum,
    link: urlPath("My Marketers"),
    icon: <BsFillPeopleFill size={24} />,
  },
  {
    label: "Total Adverts",
    num: adNum,
    link: urlPath("My Adverts"),
    icon: <RiAdvertisementFill size={24} />,
    state: {isAdActive: true}
  },
  {
    label: "Inactive Adverts",
    num: inActiveAdNum,
    link: urlPath("My Adverts"),
    icon: <RiAdvertisementFill size={24} />,
    state: {isAdActive: false}
  },
];

export default function Overview() {
  const {data:marketers, isLoading: isMarketersLoading} = useManagerMarketersQuery()
  const { isManager } = useAuthUserProfile((state) => state.userProfile);

  const [adNum, setAdNum] = useState(0);
  const [inActiveAdNum, setInActiveAdNum] = useState(0);

  const overviewElementsGenerator = useCallback(
    (isManager: boolean | undefined): OverviewType[] => {
      const mktrNum = isMarketersLoading ? 0 : marketers ? marketers.length : 0
      const overviewElems = overviewElements(mktrNum, 0, inActiveAdNum);
      if (isManager) return overviewElems;
      return overviewElems.slice(1);
    },
    [marketers, isMarketersLoading, adNum, inActiveAdNum]
  );


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
            ({ label, num, link, icon, state }) => (
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
                      state={state}
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
