export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
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
