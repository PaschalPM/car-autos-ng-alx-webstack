import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import OverviewCard from "../components/views/dashboard/Overview";
import RecentActivitiesCard from "../components/views/dashboard/RecentActivities";
import MyDetailsCard from "../components/views/dashboard/MyDetails";


export default function Dashboard() {
  return (
    <>
      <Typography variant="h5">Dashboard</Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <OverviewCard />
          <RecentActivitiesCard />
          
        </Grid>
        <Grid item xs={12} md={4}>
          <MyDetailsCard/>
        </Grid>
      </Grid>
    </>
  );
}
