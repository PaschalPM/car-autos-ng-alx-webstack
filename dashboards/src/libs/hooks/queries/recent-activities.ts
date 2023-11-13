import { useQuery } from "react-query";
import { axiosClient } from "../../requests/@config";
import { AxiosError, AxiosResponse } from "axios";

const recentActivitiesRequest = () => axiosClient.get("/activities");

const useRecentActivitiesQuery = () => useQuery<AxiosResponse<RecentActivity>, AxiosError>({ queryKey: 'recent-activities', queryFn: recentActivitiesRequest })
export default useRecentActivitiesQuery