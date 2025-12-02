import axios from "../../axiosConfig";

const updateUser = async (userData) => {
  try {
    const response = await axios.put(`/users/${userData.id}`, userData);

    if (!response.data) {
      throw new Error("Empty response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
};

export const userAuthService = {
  updateUser,
};
