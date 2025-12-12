import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

function PublicRoute({ children }: { children: ReactNode }) {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
