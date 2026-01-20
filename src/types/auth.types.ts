import { User } from "./user.types";

export type SafeUser = Omit<User, "password">;

export interface AuthState {
  isAuthenticated: boolean;
  user: SafeUser | null;
  loading: boolean;
  authLoading: boolean;
  register: (userData: RegisterData) => Promise<SafeUser>;
  login: (email: string, password: string) => Promise<SafeUser>;
  logout: () => void;
  updateUserProfile: (updateUserData: SafeUser) => Promise<SafeUser>;
  initializeAuth: () => void;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
}
