import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores";
import { Loader } from "../components";
import { hasAdminAccess } from "../utils";

function AdminRoute({ children }: { children: ReactNode }) {
  const { user, loading, authLoading } = useAuthStore();
  const location = useLocation();

  if (loading || authLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAdminAccess(user.role)) {
    return <Navigate to="/account" replace />;
  }

  return children;
}

export default AdminRoute;
