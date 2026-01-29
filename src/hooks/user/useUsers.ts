import { useState } from "react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { userService } from "../../api";
import { User, UserResponse, ApiError, UseUserByRoleReturn } from "../../types";

export const useUsers = () => {
  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR<User[], ApiError>("users", userService.getUsers, {
    revalidateOnFocus: false,
  });

  return {
    users: data || [],
    loading: isLoading,
    error,
    refetch,
  };
};

export const useUserById = (id: number) => {
  const { data, error, isLoading } = useSWR<User | null, ApiError>(
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

export const useUserByRole = (
  role: string,
  initialPage = 1,
  initialLimit = 10
): UseUserByRoleReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const shouldFetchAll = role === "all";

  const {
    data,
    error,
    isLoading,
    mutate: refetch,
  } = useSWR<UserResponse | User[], ApiError>(
    shouldFetchAll
      ? ["allUsers", currentPage, initialLimit]
      : role
      ? ["usersByRole", role, currentPage, initialLimit]
      : null,
    () =>
      shouldFetchAll
        ? userService.getUsers()
        : userService.getUserByRole(role, currentPage, initialLimit),
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    }
  );

  const { trigger: triggerDelete, isMutating: isDeleting } = useSWRMutation<
    { success: boolean },
    ApiError,
    ["deleteUser", string],
    number
  >(
    ["deleteUser", role],
    async (_key, { arg }: { arg: number }) => {
      await userService.deleteUser(arg);

      const currentData = data || ({} as UserResponse);
      const currentUsers = Array.isArray(currentData)
        ? currentData
        : (currentData as UserResponse).data?.users ||
          (currentData as UserResponse).data ||
          [];
      const usersArray = Array.isArray(currentUsers) ? currentUsers : [];
      const remainingUsers = usersArray.length - 1;

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
      },
    }
  );

  const goToPage = (page: number) => {
    const responseData = data as UserResponse | undefined;
    const totalPages =
      responseData && !Array.isArray(responseData)
        ? responseData.data?.totalPages ||
          (responseData.total
            ? Math.ceil(responseData.total / initialLimit)
            : 1)
        : 1;

    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  let users: User[] = [];

  if (shouldFetchAll && Array.isArray(data)) {
    users = data;
  } else if (!Array.isArray(data)) {
    const responseData = data as UserResponse | undefined;
    if (responseData?.data?.users && Array.isArray(responseData.data.users)) {
      users = responseData.data.users;
    } else if (Array.isArray(responseData?.data)) {
      users = responseData.data;
    }
  }

  const responseData = data as UserResponse | undefined;
  const totalPages =
    responseData && !Array.isArray(responseData)
      ? responseData.data?.totalPages ||
        (responseData.total ? Math.ceil(responseData.total / initialLimit) : 1)
      : 1;

  const totalUsers = shouldFetchAll
    ? Array.isArray(data)
      ? data.length
      : 0
    : responseData?.total || 0;

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
