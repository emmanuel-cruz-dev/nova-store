import { useState, useEffect } from "react";
import { AuthContext } from "../hooks";
import axios from "../api/axiosConfig";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("user") === null ? false : true;
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    setAuthLoading(true);

    try {
      let existingUsers = [];

      try {
        const response = await axios.get(`/users?email=${userData.email}`);
        existingUsers = response.data || [];
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          throw error;
        }
      }

      if (existingUsers.length > 0) {
        throw new Error("El correo electrónico ya está registrado");
      }

      const newUserData = {
        ...userData,
        role: "customer",
        createdAt: new Date().toISOString(),
        avatar:
          userData.avatar && userData.avatar.trim() !== ""
            ? userData.avatar
            : "https://i.imgur.com/p4HoTq6.jpeg",
      };

      const response = await axios.post("/users", newUserData);
      const newUser = response.data;

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setIsAuthenticated(true);

      return newUser;
    } catch (error) {
      console.error("Error en registro:", error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setAuthLoading(true);

    try {
      let users = [];

      try {
        const response = await axios.get(`/users?email=${email}`);
        users = response.data || [];
      } catch (error) {
        if (error.response && error.response.status === 404) {
          throw new Error("El correo electrónico no está registrado");
        }

        throw error;
      }

      if (users.length === 0) {
        throw new Error("El correo electrónico no está registrado");
      }

      const foundUser = users.find((u) => u.password === password);

      if (!foundUser) {
        throw new Error("La contraseña es incorrecta");
      }

      setIsAuthenticated(true);
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      return foundUser;
    } catch (error) {
      console.error("Error en login:", error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUserProfile = async (updateUserData) => {
    setUser(updateUserData);
    localStorage.setItem("user", JSON.stringify(updateUserData));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
        loading,
        authLoading,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
