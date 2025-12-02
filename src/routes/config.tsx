import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Profile = lazy(() => import("../pages/Profile"));
const Cart = lazy(() => import("../pages/Cart"));
const Products = lazy(() => import("../pages/Products"));
const Product = lazy(() => import("../pages/Product"));

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

export const privateRoutes = [
  { path: "/profile", element: <Profile /> },
  { path: "/cart", element: <Cart /> },
];

export const fallbackRoute = { path: "*", element: <NotFound /> };
