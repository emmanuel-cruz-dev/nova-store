import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .email({ message: "El email no es válido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "El nombre es requerido" }).trim(),
    lastName: z.string().min(1, { message: "El apellido es requerido" }).trim(),
    email: z
      .string()
      .min(1, { message: "El email es requerido" })
      .email({ message: "El email no es válido" }),
    password: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string()
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

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
