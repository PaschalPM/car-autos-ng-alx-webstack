import Container from "@mui/material/Container";
import usePageTitleSetter from "../../libs/hooks/setPageTitle";
import { Formik, Form, FormikProps } from "formik";
import Header from "../../components/views/new-advert/header";
import Body from "../../components/views/new-advert/Body";
import formikConfig, {
  type CarAdvert,
} from "../../libs/form-configs/new-advert";
import useCloudImagesStore from "../../store/cloudImages";
import ViewProvider from "../../components/views/new-advert/ViewProvider";
import useAuthUserProfile from "../../store/auth-user";
import { useLocation } from "react-router-dom";

export default function AddAdvert() {
  usePageTitleSetter("Post Advert");
  const userProfile = useAuthUserProfile((state) => state.userProfile);
  const state = useLocation().state as {marketerId: string}
  const userId = state && state.marketerId ? state.marketerId : userProfile.id
  const acceptedImages = useCloudImagesStore((state) => state.acceptedImages);
  const imagesSecuredURLs: string[] = acceptedImages.map(
    (img) => img.securedURL
  );
  return (
    <ViewProvider>
      <Formik {...formikConfig(userId as string, imagesSecuredURLs)}>
        {({ initialValues }: FormikProps<CarAdvert>) => (
          <Container maxWidth={"sm"} disableGutters>
            <Form>
              <Header />
              <Body initialValues={initialValues} />
            </Form>
          </Container>
        )}
      </Formik>
    </ViewProvider>
  );
}
