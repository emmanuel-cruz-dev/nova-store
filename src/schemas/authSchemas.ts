import { z } from "zod";

const nameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "El email es requerido" })
    .min(5, { message: "El email debe tener al menos 5 caracteres" })
    .email({ message: "El email no es válido" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "La contraseña es requerida" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: "El nombre es requerido" })
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
      .max(50, { message: "El nombre no puede exceder 50 caracteres" })
      .regex(nameRegex, { message: "El nombre solo puede contener letras" }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: "El apellido es requerido" })
      .min(3, { message: "El apellido debe tener al menos 3 caracteres" })
      .max(50, { message: "El apellido no puede exceder 50 caracteres" })
      .regex(nameRegex, { message: "El apellido solo puede contener letras" }),
    email: z
      .string()
      .trim()
      .min(1, { message: "El email es requerido" })
      .email({ message: "El email no es válido" })
      .min(5, { message: "El email debe tener al menos 5 caracteres" }),
    password: z
      .string()
      .trim()
      .min(1, { message: "La contraseña es requerida" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Debe confirmar la contraseña" }),
    avatar: z
      .string()
      .url({ message: "La URL del avatar no es válida" })
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const passwordSchema = z
  .object({
    oldPassword: z
      .string()
      .trim()
      .min(1, { message: "La contraseña anterior es requerida" }),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: "La nueva contraseña es requerida" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Debes confirmar la contraseña" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre no puede exceder 50 caracteres" })
    .regex(nameRegex, { message: "El nombre solo puede contener letras" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "El apellido es requerido" })
    .min(3, { message: "El apellido debe tener al menos 3 caracteres" })
    .max(50, { message: "El apellido no puede exceder 50 caracteres" })
    .regex(nameRegex, { message: "El apellido solo puede contener letras" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "El email es requerido" })
    .email({ message: "El email no es válido" })
    .min(5, { message: "El email debe tener al menos 5 caracteres" }),
});

export type PasswordFormData = z.infer<typeof passwordSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
