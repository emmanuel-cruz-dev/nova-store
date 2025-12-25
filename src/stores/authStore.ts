import { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../api/axiosConfig";
import { AuthState, RegisterData, User } from "../types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      loading: true,
      authLoading: false,

      initializeAuth: () => {
        set({ loading: false });
      },

      register: async (userData: RegisterData): Promise<User> => {
        set({ authLoading: true });

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

          set({
            user: newUser,
            isAuthenticated: true,
            authLoading: false,
          });

          return newUser;
        } catch (error) {
          set({ authLoading: false });
          const err = error as Error;
          console.error("Error en registro:", err.message);
          throw error;
        }
      },

      login: async (email: string, password: string): Promise<User> => {
        set({ authLoading: true });

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

          set({
            isAuthenticated: true,
            user: foundUser,
            authLoading: false,
          });

          return foundUser;
        } catch (error) {
          set({ authLoading: false });
          const err = error as Error;
          console.error("Error en login:", err.message);
          throw error;
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },

      updateUserProfile: async (updateUserData: User): Promise<User> => {
        set({ user: updateUserData });
        return updateUserData;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.loading = false;
        }
      },
    }
  )
);
