import { useState } from "react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { userService } from "../api/services/user.service";

export const useUsers = () => {
  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR("users", userService.getUsers, {
    revalidateOnFocus: false,
  });

  return {
    users: data || [],
    loading: isLoading,
    error,
    refetch,
  };
};

export const useUserById = (id) => {
  const { data, error, isLoading } = useSWR(
    id ? ["user", id] : null,
    () => userService.getUserById(id),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    user: data || null,
    loading: isLoading,
    error,
  };
};

export const useUserByRole = (role, initialPage = 1, initialLimit = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR(
    role ? ["usersByRole", role, currentPage, initialLimit] : null,
    () => userService.getUserByRole(role, currentPage, initialLimit),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const { trigger: triggerDelete, isMutating: isDeleting } = useSWRMutation(
    ["deleteUser", role],
    async (_, { arg: userId }) => {
      await userService.deleteUser(userId);

      const currentData = data || {};
      const currentUsers = currentData.data?.users || currentData.data || [];
      const remainingUsers = currentUsers.length - 1;

      if (remainingUsers === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await refetch();
      }

      mutate("users");

      return { success: true };
    },
    {
      onError: (error) => {
        console.error("Error deleting user:", error);
        return { success: false, error };
      },
    }
  );

  const goToPage = (page) => {
    const totalPages =
      data?.data?.totalPages ||
      (data?.total ? Math.ceil(data.total / initialLimit) : 1);

    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const users = data?.data?.users || data?.data || [];
  const totalPages =
    data?.data?.totalPages ||
    (data?.total ? Math.ceil(data.total / initialLimit) : 1);
  const totalUsers = data?.total || 0;

  return {
    users,
    loading: isLoading || isDeleting,
    error,
    deleteUser: triggerDelete,
    refetch,
    currentPage,
    totalPages,
    totalUsers,
    goToPage,
  };
};
