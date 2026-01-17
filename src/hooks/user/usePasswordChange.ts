import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/authStore";
import { useUpdateUser } from "../auth/useUpdateUser";
import { PasswordFormData, passwordSchema } from "../../schemas/authSchemas";
import { User } from "../../types";

export function usePasswordChange({
  profileData,
  onPasswordChanged,
}: {
  profileData: User;
  onPasswordChanged: () => void;
}) {
  const { user, updateUserProfile } = useAuthStore();
  const { updateUser } = useUpdateUser();

  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = (field: "old" | "new" | "confirm") => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data: PasswordFormData) => {
    if (data.oldPassword !== user?.password) {
      setError("oldPassword", {
        type: "manual",
        message: "La contraseña anterior es incorrecta",
      });
      return;
    }

    if (data.newPassword === data.oldPassword) {
      setError("newPassword", {
        type: "manual",
        message: "La nueva contraseña debe ser diferente a la anterior",
      });
      return;
    }

    try {
      const updatedUser = await updateUser({
        ...profileData,
        password: data.newPassword,
      });

      await updateUserProfile(updatedUser as User);

      onPasswordChanged();
      toast.success("Contraseña actualizada correctamente");
      reset();
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      toast.error("Error al actualizar la contraseña");
    }
  };

  return {
    showPasswords,
    togglePasswordVisibility,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  };
}
