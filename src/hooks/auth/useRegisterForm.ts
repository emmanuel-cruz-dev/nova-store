import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../stores";
import { registerSchema, RegisterFormData } from "../../schemas/authSchemas";

export function useRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, authLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (authLoading) return;

    const { confirmPassword, avatar, ...dataToSend } = data;

    const finalData =
      avatar && avatar.trim() !== "" ? { ...dataToSend, avatar } : dataToSend;

    try {
      const newUser = await registerUser(finalData);
      console.log("Nuevo usuario:", newUser.email);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        error.message.includes("ya está registrado")
      ) {
        setError("email", {
          type: "manual",
          message: "Este correo ya está registrado",
        });
      } else {
        console.error("Error al registrar usuario:", error);
      }
    }
  };

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    authLoading,
  };
}
