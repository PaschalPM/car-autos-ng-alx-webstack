import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./@layout";
import Dashboard from "./dashboard";
import Marketers from "./marketers";
import Adverts from "./adverts";
import MyProfile from "./myProfile";
import Login from "./login";
import BeforeEnter from "../components/views/BeforeEnter";
import NotFoundPage from "../components/views/NotFoundPage";
import EditProfile from "./myProfile/edit";
import AddAdvert from "./adverts/new";
import { Link } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<Login />} />
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
        <Route path="my-marketers/new" element={<>New Marketer</>} />
        <Route path="my-adverts" element={<Adverts />} />
        <Route path="my-adverts/:id" element={<div> Details </div>}/>
        <Route path="my-adverts/new" element={<AddAdvert/>} />
        <Route path="my-profile" element={<MyProfile />} />
        <Route path="my-profile/edit" element={<EditProfile/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
