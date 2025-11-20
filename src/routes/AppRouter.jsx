import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {
  publicRoutes,
  privateRoutes,
  fallbackRoute,
  PublicRoute,
  PrivateRoute,
} from "./index";
import Loader from "../components/common/Loader";

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

        {privateRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<PrivateRoute>{element}</PrivateRoute>}
          />
        ))}

        <Route path={fallbackRoute.path} element={fallbackRoute.element} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
