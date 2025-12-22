import { MenuItem } from "./common.types";
import { Order } from "./order.types";

export interface User {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
  avatar?: string;
  createdAt?: string;
  orders?: Order[];
}

export interface UserResponse {
  data?: {
    users?: User[];
    total?: number;
    totalPages?: number;
  };
  total?: number;
}

export interface UserData
  extends Pick<User, "email" | "firstName" | "lastName" | "avatar"> {
  id: number | null;
  password: string;
}

type UserRole = "customer" | "admin";

export interface AvatarUpdateModalProps {
  show: boolean;
  onClose: () => void;
  newAvatarUrl: string;
  setNewAvatarUrl: (url: string) => void;
  onSave: () => void;
  loading: boolean;
  currentAvatar: string;
}

export interface PasswordChangeFormProps {
  profileData: User;
  onPasswordChanged: () => void;
}

export type PasswordData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type PasswordFieldType = "old" | "new" | "confirm";

export type ShowPasswordState = {
  [key in PasswordFieldType]: boolean;
};

export type PasswordDataKeys = `${PasswordFieldType}Password`;

export interface UseUpdateUserReturn {
  updateUser: (userData: User) => Promise<User | undefined>;
  loading: boolean;
  error: Error | undefined;
}

export interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
  onDelete: (user: User) => void;
}

export interface ProfileSidebarProps {
  menuItems: MenuItem[];
  activeSection: string;
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
}
