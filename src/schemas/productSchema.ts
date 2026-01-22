import { z } from "zod";
import { isValidUrl } from "../utils";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),

  description: z
    .string()
    .min(1, "La descripción es requerida")
    .min(10, "La descripción no puede ser menor a 10 caracteres")
    .max(300, "La descripción no puede exceder 300 caracteres"),

  price: z
    .number({ message: "El precio debe ser un número" })
    .positive("El precio debe ser mayor a 0")
    .max(999999, "El precio es demasiado alto"),

  stock: z
    .number({ message: "El stock debe ser un número" })
    .int("El stock debe ser un número entero")
    .nonnegative("El stock no puede ser negativo")
    .max(999999, "El stock es demasiado alto"),

  rating: z
    .number({ message: "El rating debe ser un número" })
    .min(0, "El rating debe estar entre 0 y 5")
    .max(5, "El rating debe estar entre 0 y 5"),

  brand: z.string().max(50, "La marca no puede exceder 50 caracteres"),

  category: z.string().min(1, "La categoría es requerida"),

  isActive: z.boolean(),

  image: z.string().refine(isValidUrl, "Debe ser una URL válida"),
});

export type ProductFormData = z.infer<typeof productSchema>;
