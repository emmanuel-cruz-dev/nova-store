import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "../hooks";
import axios from "../api/axiosConfig";
import { RegisterData, User } from "../types";
import { AxiosError } from "axios";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem("user") !== null;
  });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authLoading, setAuthLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser) as User);
    }
    setLoading(false);
  }, []);

  const register = async (userData: RegisterData): Promise<User> => {
    setAuthLoading(true);

    try {
      let existingUsers: User[] = [];

      try {
        const response = await axios.get<User[]>(
          `/users?email=${userData.email}`
        );
        existingUsers = response.data || [];
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status !== 404) {
          throw error;
        }
      }

      if (existingUsers.length > 0) {
        throw new Error("El correo electrónico ya está registrado");
      }

      const newUserData: Omit<User, "id"> = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: "customer",
        createdAt: new Date().toISOString(),
        avatar:
          userData.avatar && userData.avatar.trim() !== ""
            ? userData.avatar
            : "https://i.imgur.com/p4HoTq6.jpeg",
      };

      const response = await axios.post<User>("/users", newUserData);
      const newUser = response.data;

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      setIsAuthenticated(true);

      return newUser;
    } catch (error) {
      const err = error as Error;
      console.error("Error en registro:", err.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    setAuthLoading(true);

    try {
      let users: User[] = [];

      try {
        const response = await axios.get<User[]>(`/users?email=${email}`);
        users = response.data || [];
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 404) {
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
      const err = error as Error;
      console.error("Error en login:", err.message);
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

  const updateUserProfile = async (updateUserData: User): Promise<User> => {
    setUser(updateUserData);
    localStorage.setItem("user", JSON.stringify(updateUserData));
    return updateUserData;
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
