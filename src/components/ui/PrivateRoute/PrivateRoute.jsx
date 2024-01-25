import { useSelector } from "react-redux";
import { Navigate,  useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({children}) {
  const location = useLocation()
  console.log(location);
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return <>{currentUser ? children : <Navigate to="/sign-in" state={{from:location}}  replace/>}</>;
}
