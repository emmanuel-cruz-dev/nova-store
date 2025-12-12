import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { LoginData, ValidationErrors } from "../../types";
import { validateLoginForm } from "../../utils/userValidations";

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const { login, authLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authLoading) return;

    const formErrors = validateLoginForm(loginData);

    if (Object.keys(formErrors).length === 0) {
      try {
        const loggedUser = await login(loginData.email, loginData.password);
        setErrors({});

        setTimeout(() => {
          if (loggedUser.role === "admin") {
            navigate("/profile", { replace: true });
          } else if (from && from !== "/login") {
            navigate(from, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 100);
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          error.message.includes("El correo electrónico ya está registrado")
        ) {
          setErrors((prev) => ({
            ...prev,
            email: "El correo electrónico no está registrado",
          }));
        } else if (
          error instanceof Error &&
          error.message.includes("La contraseña es incorrecta")
        ) {
          setErrors((prev) => ({
            ...prev,
            password: "La contraseña es incorrecta",
          }));
        } else {
          console.error("Error al iniciar sesión:", error);
        }
      }
    } else {
      setErrors(formErrors);
    }
  };

  return {
    showPassword,
    setShowPassword,
    loginData,
    errors,
    authLoading,
    handleChange,
    handleLoginSubmit,
  };
}
