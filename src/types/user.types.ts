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

export interface AvatarUpdateModalProps {
  show: boolean;
  onClose: () => void;
  newAvatarUrl: string;
  setNewAvatarUrl: (url: string) => void;
  onSave: () => void;
  loading: boolean;
  currentAvatar: string;
}
