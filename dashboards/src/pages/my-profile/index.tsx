import usePageTitleSetter from "../../libs/hooks/setPageTitle";
import useAuthUserProfile from "../../store/auth-user";
import UserProfileView from "../../components/views/user/UserProfile";

export default function MyProfile() {
  const authUserProfile = useAuthUserProfile((state) => state.userProfile);
  usePageTitleSetter(`My Profile`);

  return <UserProfileView userProfile={authUserProfile} isAuth={true} />;
}
