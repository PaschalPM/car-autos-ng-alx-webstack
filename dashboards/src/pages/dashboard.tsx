import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import OverviewCard from "../components/views/dashboard/Overview";
import RecentActivitiesCard from "../components/views/dashboard/RecentActivities";
import MyDetailsCard from "../components/views/dashboard/MyDetails";
import useAppStore from "../store/app";

export default function Dashboard() {
  const { isManager } = useAppStore((state) => state.userProfile);
  return (
    <>
      <Typography variant="h6">Dashboard</Typography>
      <Divider sx={{ marginBottom: 2 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={isManager ? 8 : 6}>
          <OverviewCard />
          {isManager && <RecentActivitiesCard /> }
        </Grid>
        <Grid item xs={12} md={isManager ? 4 : 6}>
          <MyDetailsCard />
        </Grid>
      </Grid>
    </>
  );
}
