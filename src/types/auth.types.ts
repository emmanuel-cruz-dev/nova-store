import { User } from "./user.types";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  authLoading: boolean;
  register: (userData: RegisterData) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  updateUserProfile: (updateUserData: User) => Promise<User>;
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
