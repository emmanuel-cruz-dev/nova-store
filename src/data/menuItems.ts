import { User, LogOut, Boxes, Users, ClipboardList, Heart } from "lucide-react";
import { MenuItem } from "../types";

export const adminMenuItems: MenuItem[] = [
  { id: "profile", icon: User, label: "Mi Perfil" },
  { id: "all-orders", icon: ClipboardList, label: "Todas las Órdenes" },
  { id: "products", icon: Boxes, label: "Todos los Productos" },
  { id: "users", icon: Users, label: "Todos los Usuarios" },
  { id: "logout", icon: LogOut, label: "Cerrar Sesión" },
];

export const userMenuItems: MenuItem[] = [
  { id: "profile", icon: User, label: "Mi Perfil" },
  { id: "orders", icon: ClipboardList, label: "Mis Órdenes" },
  { id: "favorites", icon: Heart, label: "Favoritos" },
  { id: "logout", icon: LogOut, label: "Cerrar Sesión" },
];
