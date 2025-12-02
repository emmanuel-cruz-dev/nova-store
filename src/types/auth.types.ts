import { User } from "./user.types";

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (userData: User) => Promise<User>;
  logout: () => void;
  loading: boolean;
  authLoading: boolean;
  updateUserProfile: (userData: User) => Promise<User>;
}
