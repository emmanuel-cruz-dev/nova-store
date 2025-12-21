import { z } from "zod";

const isValidUrl = (string: string) => {
  if (!string) return true;
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),

  description: z
    .string()
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

// import { z } from "zod";

// const isValidUrl = (string: string) => {
//   if (!string) return true;
//   try {
//     new URL(string);
//     return true;
//   } catch {
//     return false;
//   }
// };

// export const productSchema = z.object({
//   name: z
//     .string()
//     .min(1, { message: "El nombre es requerido" })
//     .max(100, { message: "El nombre no puede exceder 100 caracteres" })
//     .trim(),

//   description: z
//     .string()
//     .max(300, { message: "La descripción no puede exceder 300 caracteres" })
//     .optional()
//     .default(""),

//   price: z.preprocess(
//     (value) => (typeof value === "string" ? parseFloat(value) : value),
//     z
//       .number()
//       .positive({ message: "El precio debe ser mayor a 0" })
//       .max(999999, { message: "El precio es demasiado alto" })
//   ),

//   stock: z.preprocess(
//     (value) => (typeof value === "string" ? parseFloat(value) : value),
//     z
//       .number()
//       .int({ message: "El stock debe ser un número entero" })
//       .nonnegative({ message: "El stock no puede ser negativo" })
//       .max(999999, { message: "El stock es demasiado alto" })
//   ),

//   rating: z
//     .preprocess(
//       (value) => (typeof value === "string" ? parseFloat(value) : value),
//       z
//         .number()
//         .min(0, { message: "El rating debe estar entre 0 y 5" })
//         .max(5, { message: "El rating debe estar entre 0 y 5" })
//     )
//     .optional()
//     .default(0),

//   brand: z
//     .string()
//     .max(50, { message: "La marca no puede exceder 50 caracteres" })
//     .optional()
//     .default(""),

//   category: z.string().min(1, { message: "La categoría es requerida" }),

//   isActive: z.boolean().default(true),

//   image: z
//     .string()
//     .refine(isValidUrl, { message: "Debe ser una URL válida" })
//     .optional()
//     .default(""),
// });

// export type ProductFormData = z.infer<typeof productSchema>;
