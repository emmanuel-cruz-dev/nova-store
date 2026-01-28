import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores";
import { userService } from "../../api";
import { canManageRole, getAssignableRoles, formatRoleName } from "../../utils";
import { User, UserRole } from "../../types";

export function useBulkUserActions(onSuccess: () => void) {
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkDeleteUsers = useCallback(
    async (userIds: number[]) => {
      setIsProcessing(true);
      let successCount = 0;

      for (const id of userIds) {
        try {
          await userService.deleteUser(id);
          successCount++;
        } catch (error) {
          console.error(`Error deleting user ${id}`, error);
        }
      }

      const result = {
        success: successCount === userIds.length,
        count: successCount,
      };

      if (result.success) {
        toast.success(`${result.count} usuarios eliminados correctamente`);
      } else {
        toast.warning(
          `${result.count} de ${userIds.length} usuarios eliminados. Algunos fallaron.`
        );
      }

      setIsProcessing(false);
      onSuccess();
    },
    [onSuccess]
  );

  const bulkChangeRole = useCallback(
    async (users: User[], newRole: UserRole) => {
      const currentUser = useAuthStore.getState().user;
      const currentUserRole = currentUser?.role || "customer";

      const assignableRoles = getAssignableRoles(currentUserRole);
      if (!assignableRoles.includes(newRole)) {
        toast.error(
          `No tienes permisos para asignar el rol de ${formatRoleName(newRole)}`
        );
        return { success: false, count: 0 };
      }

      const manageableUsers = users.filter((user) =>
        canManageRole(currentUserRole, user.role || "customer")
      );

      if (manageableUsers.length === 0) {
        toast.error("No tienes permisos para cambiar el rol de estos usuarios");
        return { success: false, count: 0 };
      }

      if (manageableUsers.length < users.length) {
        toast.warning(
          `Solo puedes cambiar ${manageableUsers.length} de ${users.length} usuarios seleccionados debido a permisos`
        );
      }

      setIsProcessing(true);
      let successCount = 0;

      for (const user of manageableUsers) {
        try {
          await userService.updateUser({ ...user, role: newRole });
          successCount++;
        } catch (error) {
          console.error(`Error changing role for user ${user.id}`, error);
        }
      }

      const result = {
        success: successCount === manageableUsers.length,
        count: successCount,
      };

      const roleText = formatRoleName(newRole);

      if (result.success) {
        toast.success(
          `${result.count} usuarios cambiados a ${roleText} correctamente`
        );
      } else {
        toast.warning(
          `${result.count} de ${manageableUsers.length} usuarios cambiados a ${roleText}. Algunos fallaron.`
        );
      }

      setIsProcessing(false);
      onSuccess();
      return result;
    },
    [onSuccess]
  );

  return {
    isProcessing,
    bulkDeleteUsers,
    bulkChangeRole,
  };
}
