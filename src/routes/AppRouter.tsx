import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {
  publicRoutes,
  customerRoutes,
  adminRoutes,
  fallbackRoute,
  PublicRoute,
  PrivateRoute,
  AdminRoute,
} from "./index";
import { Loader } from "../components";

function AppRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {publicRoutes.map(({ path, element, isPublic }) => (
          <Route
            key={path}
            path={path}
            element={isPublic ? <PublicRoute>{element}</PublicRoute> : element}
          />
        ))}

        {customerRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PrivateRoute>{element}</PrivateRoute>}
          />
        ))}

        {adminRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<AdminRoute>{element}</AdminRoute>}
          />
        ))}

        <Route path={fallbackRoute.path} element={fallbackRoute.element} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
