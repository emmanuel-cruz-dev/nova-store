import axios from "../axiosConfig";

const getUsers = async () => {
  try {
    const response = await axios.get("/users");

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw error;
  }
};

const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`/users/${id}`);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
};

const getCustomerUsers = async () => {
  try {
    const response = await axios.get("/users?role=customer");

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
    const response = await axios.get(
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

const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`/users/${id}`);

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
  getUserByRole,
  deleteUser,
};
