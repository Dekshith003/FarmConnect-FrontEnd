import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { navigationLinks } from "../utils/Constants";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={navigationLinks.login.path}
        replace
        state={{ from: location }}
      />
    );
  }
  return children;
}
