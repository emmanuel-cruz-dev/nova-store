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

type UserDataKeys = "email" | "firstName" | "lastName" | "avatar";

export interface UserData extends Pick<User, UserDataKeys> {
  id: number | null;
  password: string;
}

export type UserRole = "customer" | "admin" | "super_admin";

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

export interface UserDetailsSidebarProps {
  user: User;
  onClose: () => void;
  onDelete: (user: User) => void;
}

export interface ProfileSidebarProps {
  menuItems: MenuItem[];
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export type ActivityFilter = "all" | "active" | "inactive";

export type DateFilter =
  | "all"
  | "last-week"
  | "last-month"
  | "last-3-months"
  | "older";

export interface BaseUsersFilters {
  searchTerm: string;
  activityFilter: ActivityFilter;
  dateFilter: DateFilter;
  hasActiveFilters: boolean;
  setSearchTerm: (value: string) => void;
  setActivityFilter: (value: ActivityFilter) => void;
  setDateFilter: (value: DateFilter) => void;
  clearFilters: () => void;
}

export interface UseUsersFilterReturn extends BaseUsersFilters {
  roleFilter: RoleFilter;
  setRoleFilter: (filter: RoleFilter) => void;
  filteredUsers: User[];
  paginatedUsers: User[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export type RoleFilter = "all" | "customer" | "admin";

export interface UsersFiltersProps extends BaseUsersFilters {
  usersCount: number;
  filteredCount: number;
  roleFilter: RoleFilter;
  setRoleFilter: (filter: RoleFilter) => void;
  loading: boolean;
}

export interface RoleChangeModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: (newRole: UserRole) => void;
  selectedCount: number;
  isProcessing: boolean;
}
