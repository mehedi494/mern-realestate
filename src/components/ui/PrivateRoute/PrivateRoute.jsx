import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const location = useLocation()
  console.log(location);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return <>{currentUser ? <Outlet /> : <Navigate to="/sign-in" state={{from:location}}  replace/>}</>;
}
