import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores";
import { Loader } from "../components";
import { hasAdminAccess } from "../utils";

function PublicOrCustomerRoute({ children }: { children: ReactNode }) {
  const { user, loading, authLoading } = useAuthStore();

  if (loading || authLoading) {
    return <Loader />;
  }

  if (hasAdminAccess(user?.role)) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default PublicOrCustomerRoute;
