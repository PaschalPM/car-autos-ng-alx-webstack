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
import { urlPath, secColor, baseColor } from "../../../libs/utils";

const overviewElements: {label:string, num:number, link:string, icon:React.ReactNode}[] = [
    {
        label: 'Total Marketers',
        num: 5,
        link: urlPath('My Marketers'),
        icon: <BsFillPeopleFill size={24} color={"#666"} />
    },
    {
        label: 'Total Adverts',
        num: 200,
        link: urlPath('My Adverts'),
        icon: <RiAdvertisementFill size={24} color={"#666"}/>
    },
    {
        label: 'Inactive Adverts',
        num: 100,
        link: urlPath('My Adverts'),
        icon: <RiAdvertisementFill size={24} color={"#666"}/>
    },

]
export default function Overview() {
  return (
    <Card sx={{marginBottom:2}}>
      <CardContent>
        <Typography variant={"h6"} sx={{ fontWeight: 500, color:baseColor }} gutterBottom>
          Overview
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={6}
          useFlexGap
          flexWrap="wrap"
          py={2}
          px={{ sm: 3, md: 1 }}
          sx={{
            justifyContent: "space-between",
          }}
        >
          {overviewElements.map(({label, num, link, icon}) => (
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor: secColor,
                  width: "40px",
                  height: "40px",
                  borderRadius: ".5em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                { icon }
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
                  sx={{
                    color: "#666",
                  }}
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

                <Typography variant="caption" color={"error"}>
                  <Link
                    component={ReactLink}
                    sx={{
                      textDecoration: "none",
                      color: baseColor,
                      fontWeight: "900",
                    }}
                    to={link}
                  >
                    view all
                  </Link>
                </Typography>
              </Box>
            </Paper>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
