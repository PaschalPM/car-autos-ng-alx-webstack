import Container from "@mui/material/Container";
import usePageTitleSetter from "../../libs/hooks/setPageTitle";
import { Formik, Form, FormikProps } from "formik";
import Header from "../../components/views/new-advert/header";
import Body from "../../components/views/new-advert/body";
import formikConfig, {
  type CarAdvert,
} from "../../libs/form-configs/new-advert";


export default function AddAdvert() {
  usePageTitleSetter("Post Advert");

  return (
    <Formik {...formikConfig}>
      {({ initialValues }: FormikProps<CarAdvert>) => (
        <Container maxWidth={"sm"} disableGutters>
          <Form>
            <Header />
            <Body initialValues={initialValues} />
          </Form>
        </Container>
      )}
    </Formik>
  );
}
