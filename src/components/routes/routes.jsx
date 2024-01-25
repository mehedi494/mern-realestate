import { createBrowserRouter } from "react-router-dom";
import About from "../../pages/About";
import Profile from "../../pages/Profile";
import SignUp from "../../pages/SignUp";
import Signin from "../../pages/Signin";

import Home from "../../pages/Home";
import Main from "../layout/Main";
import PrivateRoute from "../ui/PrivateRoute/PrivateRoute";

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
        element: <PrivateRoute><Profile></Profile></PrivateRoute>,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <Signin />,
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
