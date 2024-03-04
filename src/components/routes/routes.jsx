import { createBrowserRouter } from "react-router-dom";
import About from "../../pages/About";
import Profile from "../../pages/Profile";
import SignUp from "../../pages/SignUp";
import Home from "../../pages/Home";
import Main from "../layout/Main";
import PrivateRoute from "../ui/PrivateRoute/PrivateRoute";
import CreateListing from "../../pages/CreateListing";
import SignIn from "../../pages/SignIn";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      { path: "/", element: <Home></Home> },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "create-listing",
        element: (
          <PrivateRoute>
            <CreateListing></CreateListing>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);
export default routes;
