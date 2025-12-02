import { useState } from "react";
import { useAuth } from "../useAuth";
import { validateRegisterForm } from "../../utils/utils";

export function useRegisterForm() {
  const { register, authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authLoading) return;

    const formErrors = validateRegisterForm(formData);
    if (Object.keys(formErrors).length === 0) {
      const { confirmPassword: _, ...dataToSend } = formData;
      if (!dataToSend.avatar) delete dataToSend.avatar;

      try {
        const newUser = await register(dataToSend);
        console.log("Nuevo usuario:", newUser);
      } catch (error) {
        if (error.message.includes("ya está registrado")) {
          setErrors((prev) => ({
            ...prev,
            email: "Este correo ya está registrado",
          }));
        } else {
          console.error("Error al registrar usuario:", error);
        }
      }
    } else {
      setErrors(formErrors);
    }
  };

  return {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    formData,
    errors,
    authLoading,
    handleChange,
    handleSubmit,
  };
}
