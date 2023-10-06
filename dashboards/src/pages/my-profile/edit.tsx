import usePageTitleSetter from "../../libs/hooks/setPageTitle";
import EditProfileView from "../../components/views/user/EditProfile";
import useAuthUserProfile from "../../store/auth-user";

export default function EditProfile() {
  usePageTitleSetter(`Edit My Profile`);
  const userProfile = useAuthUserProfile((state) => state.userProfile);

  return <EditProfileView userProfile={userProfile} />;
}
