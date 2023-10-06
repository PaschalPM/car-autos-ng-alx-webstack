import usePageTitleSetter from "../../libs/hooks/setPageTitle";
import EditProfileView from "../../components/views/user/EditProfile";
import { useLocation } from "react-router-dom";

export default function EditProfile() {
  const state = useLocation().state as unknown as { userProfile: UserValues };
  const userProfile = state.userProfile;
  usePageTitleSetter(`Edit ${userProfile.username} Profile`);

  return <EditProfileView userProfile={userProfile} />;
}
