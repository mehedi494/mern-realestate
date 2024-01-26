import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function PrivateRoute({ children }) {
  const location = useLocation();

  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {currentUser ? (
        children
      ) : (
        <Navigate to="/sign-in" state={{ from: location }} replace />
      )}
    </>
  );
}
