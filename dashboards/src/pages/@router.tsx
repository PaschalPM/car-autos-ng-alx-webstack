import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./@layout";
import Dashboard from "./dashboard";
import Marketers from "./marketers";
import Adverts from "./adverts";
import MyProfile from "./my-profile";
import Login from "./login";
import BeforeEnter from "../components/views/BeforeEnter";
import NotFoundPage from "../components/views/NotFoundPage";
import EditMyProfile from "./my-profile/edit";
import AddAdvert from "./adverts/new";
import CarAdvertDetails from "./adverts/details";
import ImageFullScreenSlider from "../components/ImageFullScreenSlider";
import MarketerProfile from "./marketer-profile";
import EditMarketerProfile from "./marketer-profile/edit";
import NewMarketer from "./marketers/new";
import { Link } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<Login />} />
      <Route
        path="fullscreen-image-display"
        element={<ImageFullScreenSlider />}
      />
      <Route
        path="/"
        element={
          <>
            Home Page <br />
            <Link to="/dashboard/"> To dashboard </Link> <br />
            <Link to="/login"> Login </Link>
          </>
        }
      />
      <Route
        path="dashboard/"
        element={
          <BeforeEnter>
            <Layout />
          </BeforeEnter>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="my-marketers" element={<Marketers />} />
        <Route path="my-marketers/new" element={<NewMarketer />} />
        <Route path="my-marketers/:username" element={<MarketerProfile />} />
        <Route
          path="my-marketers/:username/edit"
          element={<EditMarketerProfile />}
        />
        <Route path="my-adverts" element={<Adverts />} />
        <Route path="my-adverts/new" element={<AddAdvert />} />
        <Route path="my-adverts/:id" element={<CarAdvertDetails />} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="my-profile/edit" element={<EditMyProfile />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
