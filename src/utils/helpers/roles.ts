import { UserRole } from "../../types";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  customer: 1,
  admin: 2,
  super_admin: 3,
};

export function isUserRole(role: string): role is UserRole {
  return ["customer", "admin", "super_admin"].includes(role);
}

export const canManageRole = (
  managerRole: string,
  targetRole: string
): boolean => {
  if (!isUserRole(managerRole) || !isUserRole(targetRole)) return false;
  return ROLE_HIERARCHY[managerRole] > ROLE_HIERARCHY[targetRole];
};

export const canViewRole = (
  viewerRole: string,
  targetRole: string
): boolean => {
  if (!isUserRole(viewerRole) || !isUserRole(targetRole)) return false;
  return ROLE_HIERARCHY[viewerRole] >= ROLE_HIERARCHY[targetRole];
};

export const getAssignableRoles = (userRole: string): UserRole[] => {
  if (!isUserRole(userRole)) return [];

  return (Object.keys(ROLE_HIERARCHY) as UserRole[]).filter(
    (role) => ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[role]
  );
};

export const getRoleBadgeVariant = (
  role?: string
): "danger" | "warning" | "secondary" => {
  switch (role) {
    case "super_admin":
      return "danger";
    case "admin":
      return "warning";
    default:
      return "secondary";
  }
};

export const hasAdminAccess = (role?: string): boolean => {
  return role === "admin" || role === "super_admin";
};

export const isSuperAdmin = (role?: string): boolean => {
  return role === "super_admin";
};

export const isCustomer = (role?: string): boolean => {
  return role === "customer";
};

export const formatRoleName = (role?: string): string => {
  switch (role) {
    case "super_admin":
      return "Super Admin";
    case "admin":
      return "Admin";
    case "customer":
      return "Cliente";
    default:
      return "Unknown";
  }
};
