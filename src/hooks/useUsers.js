import { useEffect, useState } from "react";
import { userService } from "../api/services/user.service";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      userService.getUsers().then((data) => {
        setUsers(data);
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { users, loading, error };
};

export const useUserById = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      userService.getUserById(id).then((data) => {
        setUser(data);
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  return { user, loading, error };
};

export const useUserByRole = (role, initialPage = 1, initialLimit = 10) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const fetchUsers = async (page = currentPage) => {
    setLoading(true);
    try {
      const { data, total } = await userService.getUserByRole(
        role,
        page,
        initialLimit
      );

      setUsers(data.users || data);
      setCurrentPage(data.page || page);
      setTotalPages(data.totalPages || Math.ceil(total / initialLimit));
      setTotalUsers(total);

      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, currentPage]);

  const deleteUser = async (userId) => {
    try {
      await userService.deleteUser(userId);

      const remainingUsers = users.length - 1;
      if (remainingUsers === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      } else {
        await fetchUsers(currentPage);
      }

      return { success: true };
    } catch (error) {
      setError(error);
      return { success: false, error };
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return {
    users,
    loading,
    error,
    deleteUser,
    refetch: fetchUsers,
    currentPage,
    totalPages,
    totalUsers,
    goToPage,
  };
};
