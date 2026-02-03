import { z } from "zod";

export const accountDeletionSchema = z
  .object({
    confirmText: z.string().min(1, "Este campo es requerido"),
    password: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  })
  .superRefine((data, ctx) => {
    if (data.confirmText !== "ELIMINAR") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Debes escribir exactamente "ELIMINAR" para confirmar',
        path: ["confirmText"],
      });
    }
  });

export type AccountDeletionFormData = z.infer<typeof accountDeletionSchema>;
