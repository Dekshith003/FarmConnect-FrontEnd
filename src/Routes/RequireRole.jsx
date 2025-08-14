import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RequireRole({ allowedRoles, children }) {
  const { user } = useSelector((state) => state.auth);
  if (!user) return children; // Allow access if not logged in
  if (!allowedRoles.includes(user.role)) return <Navigate to="/marketplace" />;
  return children;
}
