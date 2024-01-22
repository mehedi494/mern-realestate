import { createBrowserRouter } from "react-router-dom";
import About from "../../pages/About";
import Profile from "../../pages/Profile";
import SignUp from "../../pages/SignUp";
import Signin from "../../pages/Signin";
import Main from "../layout/main";
import Home from "../../pages/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [{ path: "/", element: <Home></Home> },
  {
    path:"about",
    element:<About></About>
  }],
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
  {
    path: "/profile",
    element: <Profile />,
  },
]);
export default routes;
