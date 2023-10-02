import usePageTitleSetter from "../libs/hooks/setPageTitle";
import Grid from "@mui/material/Grid";
import OverviewCard from "../components/views/dashboard/Overview";
import RecentActivitiesCard from "../components/views/dashboard/RecentActivities";
import MyProfileCard from "../components/views/dashboard/MyProfile";
import useAppStore from "../store/app";


export default function Dashboard() {
  usePageTitleSetter("Dashboard")
  const { isManager } = useAppStore((state) => state.userProfile);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={isManager ? 8 : 6} sx={{ width: "100%" }}>
        <OverviewCard />
        {isManager && <RecentActivitiesCard />}
      </Grid>
      <Grid item xs={12} md={isManager ? 4 : 6}>
        <MyProfileCard />
      </Grid>
    </Grid>
  );
}
