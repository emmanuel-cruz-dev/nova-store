import {
  User,
  LogOut,
  Boxes,
  Users,
  ClipboardList,
  Heart,
  LayoutDashboard,
} from "lucide-react";
import { MenuItem } from "../types";

export const adminMenuItems: MenuItem[] = [
  { id: "dashboard", icon: LayoutDashboard, label: "Panel de control" },
  { id: "orders", icon: ClipboardList, label: "Órdenes" },
  { id: "products", icon: Boxes, label: "Productos" },
  { id: "users", icon: Users, label: "Usuarios" },
  { id: "profile", icon: User, label: "Mi perfil" },
  { id: "logout", icon: LogOut, label: "Cerrar sesión" },
];

export const userMenuItems: MenuItem[] = [
  { id: "profile", icon: User, label: "Mi perfil" },
  { id: "orders", icon: ClipboardList, label: "Mis órdenes" },
  { id: "favorites", icon: Heart, label: "Favoritos" },
  { id: "logout", icon: LogOut, label: "Cerrar sesión" },
];
