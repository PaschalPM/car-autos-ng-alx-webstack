import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./@layout";
import Dashboard from "./dashboard";
import Marketers from "./marketers";
import Adverts from "./adverts";
import MyDetails from "./myDetails";
import Login from "./login";
import BeforeEnter from "../components/views/BeforeEnter";
import NotFoundPage from "../components/views/NotFoundPage";
import { Link } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="login" element={<Login />} />
      <Route
        path="/"
        element={
          <>
            Home Page <br /> <Link to='/dashboard'> To dashboard </Link>
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
        <Route path="my-adverts" element={<Adverts />} />
        <Route path="my-details" element={<MyDetails />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default router;
