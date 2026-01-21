import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores";
import { Loader } from "../components";

function PublicOrCustomerRoute({ children }: { children: ReactNode }) {
  const { user, loading, authLoading } = useAuthStore();

  if (loading || authLoading) {
    return <Loader />;
  }

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default PublicOrCustomerRoute;
