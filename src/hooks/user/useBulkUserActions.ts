import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { userService } from "../../api/services/user.service";
import { User } from "../../types";

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
    async (users: User[], newRole: "customer" | "admin") => {
      setIsProcessing(true);
      let successCount = 0;

      for (const user of users) {
        try {
          await userService.updateUser({ ...user, role: newRole });
          successCount++;
        } catch (error) {
          console.error(`Error changing role for user ${user.id}`, error);
        }
      }

      const result = {
        success: successCount === users.length,
        count: successCount,
      };

      const roleText = newRole === "admin" ? "administradores" : "clientes";

      if (result.success) {
        toast.success(
          `${result.count} usuarios cambiados a ${roleText} correctamente`
        );
      } else {
        toast.warning(
          `${result.count} de ${users.length} usuarios cambiados a ${roleText}. Algunos fallaron.`
        );
      }

      setIsProcessing(false);
      onSuccess();
    },
    [onSuccess]
  );

  return {
    isProcessing,
    bulkDeleteUsers,
    bulkChangeRole,
  };
}
