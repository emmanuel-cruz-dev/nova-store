import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";

function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
