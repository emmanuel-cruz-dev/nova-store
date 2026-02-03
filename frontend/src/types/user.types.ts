import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldErrors,
} from "react-hook-form";
import { AccountDeletionFormData } from "../schemas/accountDeletionSchema";
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

export type SafeUser = Omit<User, "password">;

export type UserRole = "customer" | "admin" | "super_admin";

type UserDataKeys = "email" | "firstName" | "lastName" | "avatar";

export interface UserData extends Pick<User, UserDataKeys> {
  id: number | null;
  password: string;
}

export interface UserResponse {
  data?: {
    users?: User[];
    total?: number;
    totalPages?: number;
  };
  total?: number;
}

export interface PasswordChangeFormProps {
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

export type ApiError = Error & {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export interface UseUpdateUserReturn {
  updateUser: (userData: SafeUser) => Promise<SafeUser | undefined>;
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

export type RoleFilter = "all" | "customer" | "admin";

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

export interface UsersFiltersProps extends BaseUsersFilters {
  usersCount: number;
  filteredCount: number;
  roleFilter: RoleFilter;
  setRoleFilter: (filter: RoleFilter) => void;
  loading: boolean;
}

interface BaseModalProps {
  show: boolean;
  onClose: () => void;
}

export interface AvatarUpdateModalProps extends BaseModalProps {
  newAvatarUrl: string;
  setNewAvatarUrl: (url: string) => void;
  onSave: () => void;
  loading: boolean;
  currentAvatar: string;
}

export interface RoleChangeModalProps extends Omit<BaseModalProps, "onClose"> {
  onHide: () => void;
  onConfirm: (newRole: UserRole) => void;
  selectedCount: number;
  isProcessing: boolean;
}

export interface UseUserByRoleReturn {
  users: User[];
  loading: boolean;
  error: ApiError | undefined;
  deleteUser: (userId: number) => Promise<{ success: boolean }>;
  refetch: () => Promise<UserResponse | User[] | undefined>;
  currentPage: number;
  totalPages: number;
  totalUsers: number;
  goToPage: (page: number) => void;
}

export interface AccountDeletionModalProps extends BaseModalProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  register: UseFormRegister<AccountDeletionFormData>;
  handleSubmit: UseFormHandleSubmit<AccountDeletionFormData>;
  onSubmit: (data: AccountDeletionFormData) => Promise<void>;
  errors: FieldErrors<AccountDeletionFormData>;
  isDeleting: boolean;
}
