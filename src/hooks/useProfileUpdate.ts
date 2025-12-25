import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAuthStore } from "../stores/authStore";
import { useUpdateUser } from "./auth/useUpdateUser";
import {
  profileUpdateSchema,
  ProfileUpdateFormData,
} from "../schemas/authSchemas";
import { User } from "../types";

export function useProfileUpdate() {
  const { user, updateUserProfile } = useAuthStore();
  const { updateUser, loading } = useUpdateUser();
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data: ProfileUpdateFormData) => {
    try {
      const updatedUser = await updateUser({
        ...user,
        ...data,
      } as User);

      updateUserProfile(updatedUser as User);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Error al actualizar el perfil");
    }
  };

  const togglePasswordChange = () => {
    setShowPasswordChange((prev) => !prev);
  };

  const handlePasswordChange = () => {
    setShowPasswordChange(false);
  };

  return {
    user,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    loading,
    showPasswordChange,
    togglePasswordChange,
    handlePasswordChange,
  };
}
