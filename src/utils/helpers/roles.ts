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
      return "Customer";
    default:
      return "Unknown";
  }
};
