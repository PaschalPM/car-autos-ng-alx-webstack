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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" element={<Login/>} />
      <Route path="dashboard/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="my-marketers" element={<Marketers />} />
        <Route path="my-adverts" element={<Adverts />} />
        <Route path="my-details" element={<MyDetails />} />
      </Route>
    </Route>
  )
);

export default router;