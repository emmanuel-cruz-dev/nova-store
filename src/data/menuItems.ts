import { User, LogOut, Boxes, Users } from "lucide-react";
import { MenuItem } from "../types";

export const adminMenuItems: MenuItem[] = [
  { id: "profile", icon: User, label: "Mi Perfil" },
  { id: "products", icon: Boxes, label: "Todos los Productos" },
  { id: "users", icon: Users, label: "Todos los Usuarios" },
  { id: "logout", icon: LogOut, label: "Cerrar Sesión" },
];

export const userMenuItems: MenuItem[] = [
  { id: "profile", icon: User, label: "Mi Perfil" },
  { id: "logout", icon: LogOut, label: "Cerrar Sesión" },
];
