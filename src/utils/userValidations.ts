import { RegisterData } from "../types";
import { isValidUrl } from "./productValidations";

export const validateLoginForm = (loginData: {
  email: string;
  password: string;
}) => {
  const errors = {} as {
    [key: string]: string;
  };

  if (!loginData.email.trim()) {
    errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
    errors.email = "El email no es válido";
  }

  if (!loginData.password) {
    errors.password = "La contraseña es requerida";
  }

  return errors;
};

export const validateRegisterForm = (formData: RegisterData) => {
  const errors = {} as {
    [key: string]: string;
  };

  if (!formData.firstName.trim()) {
    errors.firstName = "El nombre es requerido";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "El apellido es requerido";
  }

  if (!formData.email.trim()) {
    errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "El email no es válido";
  }

  if (!formData.password) {
    errors.password = "La contraseña es requerida";
  } else if (formData.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Debe confirmar la contraseña";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  if (formData.avatar && !isValidUrl(formData.avatar)) {
    errors.avatar = "La URL del avatar no es válida";
  }

  return errors;
};
