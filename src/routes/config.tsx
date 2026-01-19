import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Products = lazy(() => import("../pages/Products"));
const Product = lazy(() => import("../pages/Product"));

const Cart = lazy(() => import("../pages/Cart"));
const Account = lazy(() => import("../pages/Account"));

const Admin = lazy(() => import("../pages/Admin"));

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/products", element: <Products /> },
  { path: "/product/:id", element: <Product /> },
  {
    path: "/login",
    element: <Login />,
    isPublic: true,
  },
  {
    path: "/register",
    element: <Register />,
    isPublic: true,
  },
];

export const customerRoutes = [
  { path: "/cart", element: <Cart /> },
  { path: "/account/:section?", element: <Account /> },
];

export const adminRoutes = [{ path: "/admin/:section?", element: <Admin /> }];

export const fallbackRoute = { path: "*", element: <NotFound /> };
