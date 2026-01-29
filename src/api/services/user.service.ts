import { axiosInstance } from "../index";
import { User, SafeUser } from "../../types";

const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get("/users");

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
};

const getCustomerUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get("/users?role=customer");

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching customer users", error);
    throw error;
  }
};

const getUserByRole = async (role: string, page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get(
      `/users?role=${role}&page=${page}&limit=${limit}`
    );

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    const total = await getCustomerUsers();

    return {
      data: response.data,
      total: total.length,
    };
  } catch (error) {
    console.error("Error fetching user by role", error);
    throw error;
  }
};

const updateUser = async (userData: SafeUser): Promise<SafeUser> => {
  try {
    const response = await axiosInstance.put(`/users/${userData.id}`, userData);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    const { password: _, ...safeUser } = response.data;
    return safeUser as SafeUser;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

const deleteUser = async (id: number): Promise<User> => {
  try {
    const response = await axiosInstance.delete(`/users/${id}`);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};

export const userService = {
  getUsers,
  getUserById,
  getCustomerUsers,
  getUserByRole,
  updateUser,
  deleteUser,
};
