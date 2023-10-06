import Container from "@mui/material/Container";
import usePageTitleSetter from "../../libs/hooks/setPageTitle";
import { Formik, Form, FormikProps } from "formik";
import Header from "../../components/views/new-advert/Header";
import Body from "../../components/views/new-advert/Body";
import formikConfig, {
  type CarAdvert,
} from "../../libs/form-configs/new-advert";
import useCloudImagesStore from "../../store/cloudImages";
import ViewProvider from "../../components/views/new-advert/ViewProvider";

export default function AddAdvert() {
  usePageTitleSetter("Post Advert");
  const acceptedImages = useCloudImagesStore((state) => state.acceptedImages);
  const imagesSecuredURLs: string[] = acceptedImages.map(
    (img) => img.securedURL
  );

  return (
    <ViewProvider>
      <Formik {...formikConfig(imagesSecuredURLs)}>
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
