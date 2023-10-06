import { useParams } from "react-router-dom";
import { useManagerMarketersQuery } from "../../libs/hooks/queries/marketers";
import UserProfileView from "../../components/views/user/UserProfile";

function MarketerProfile() {
  const { username } = useParams() as { username: string };
  const { data: marketers } = useManagerMarketersQuery();
  const currentMarketerProfile = marketers?.find(
    (marketer) => marketer.username === username
  );
  return (
    <UserProfileView userProfile={currentMarketerProfile as UserValues} isAuth={false} />
  );
}

export default MarketerProfile;
