import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../stores";
import { hasAdminAccess } from "../../utils";
import { loginSchema, LoginFormData } from "../../schemas/authSchemas";

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (authLoading) return;

    setAuthLoading(true);

    try {
      const loggedUser = await login(data.email, data.password);

      if (hasAdminAccess(loggedUser.role)) {
        navigate("/admin/dashboard", { replace: true });
      } else if (from && from !== "/login") {
        navigate(from, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error: unknown) {
      setAuthLoading(false);
      if (
        error instanceof Error &&
        error.message.includes("El correo electrónico")
      ) {
        setError("email", {
          type: "manual",
          message: "El correo electrónico no está registrado",
        });
      } else if (
        error instanceof Error &&
        error.message.includes("La contraseña es incorrecta")
      ) {
        setError("password", {
          type: "manual",
          message: "La contraseña es incorrecta",
        });
      } else {
        console.error("Error al iniciar sesión:", error);
      }
    }
  };

  return {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    authLoading,
  };
}
