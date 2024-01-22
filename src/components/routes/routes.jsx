import { createBrowserRouter } from "react-router-dom";
import About from "../../pages/About";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";
import SignUp from "../../pages/SignUp";
import Signin from "../../pages/Signin";

 const routes = createBrowserRouter([
  {
    path:"/",
    element:<Home></Home>
  },
  {
    path:"/sign-in",
    element:<Signin/>
  },
  {
    path:"/sign-up",
    element:<SignUp/>
  },
  {
    path:"/about",
    element:<About/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
])
export default routes;