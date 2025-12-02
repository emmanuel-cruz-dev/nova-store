export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
}

type UserRole = "customer" | "admin";
