import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores";
import { Loader } from "../components";

function PublicRoute({ children }: { children: ReactNode }) {
  const { user, loading, authLoading } = useAuthStore();

  if (loading || authLoading) {
    return <Loader />;
  }

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
