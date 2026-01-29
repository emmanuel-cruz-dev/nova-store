import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userService } from "../../api";
import {
  accountDeletionSchema,
  AccountDeletionFormData,
} from "../../schemas/accountDeletionSchema";
import { ApiError } from "../../types";

export const useAccountDeletion = ({
  userId,
  onLogout,
}: {
  userId: number;
  onLogout: () => void;
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<AccountDeletionFormData>({
    resolver: zodResolver(accountDeletionSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      confirmText: "",
      password: "",
    },
  });

  const deleteAccount = async (password: string) => {
    const user = await userService.getUserById(userId);

    if (user.password !== password) {
      setIsDeleting(false);
      throw new Error("La contraseña es incorrecta");
    }

    await userService.deleteUser(userId);
    onLogout();
    navigate("/", { replace: true });
  };

  const onSubmit = async (data: AccountDeletionFormData) => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteAccount(data.password);
    } catch (err) {
      const error = err as ApiError;

      if (error.message === "La contraseña es incorrecta") {
        setError("password", {
          type: "manual",
          message: "La contraseña es incorrecta",
        });
      } else {
        setError("root", {
          type: "server",
          message:
            error.response?.data?.message || "Error al eliminar la cuenta",
        });
      }

      setIsDeleting(false);
    }
  };

  const resetForm = () => {
    reset();
    setShowPassword(false);
  };

  return {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isDeleting,
    resetForm,
  };
};
