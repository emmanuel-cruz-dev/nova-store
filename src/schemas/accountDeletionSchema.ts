import { z } from "zod";

export const accountDeletionSchema = z.object({
  confirmText: z.string().refine((val) => val === "ELIMINAR", {
    message: 'Debes escribir exactamente "ELIMINAR" para confirmar',
  }),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type AccountDeletionFormData = z.infer<typeof accountDeletionSchema>;
