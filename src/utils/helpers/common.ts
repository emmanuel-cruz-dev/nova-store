import { CategoryDataProps } from "../../types";

export function handleRetry() {
  window.location.reload();
}

export function renderCategory(category: string) {
  switch (category) {
    case "tecnologia":
      return "Tecnología";
    case "gaming":
      return "Gaming";
    case "hombres":
      return "Ropa de Hombre";
    case "mujeres":
      return "Ropa de Mujer";
    default:
      return "Todos los productos";
  }
}

export const getColSize = (displayCategories: CategoryDataProps[]) => {
  const count = displayCategories.length;
  if (count === 1) return 12;
  if (count === 2) return 6;
  if (count === 3) return 4;
  return 3;
};

export const getStockStatus = (
  stock: number
): {
  label: string;
  color: string;
  description: string;
} => {
  if (stock <= 5)
    return {
      label: "Crítico",
      color: "danger",
      description: "Quedan muy pocas unidades",
    };

  if (stock <= 10)
    return {
      label: "Bajo",
      color: "warning",
      description: "Conviene reponer stock",
    };

  if (stock <= 20)
    return {
      label: "OK",
      color: "success",
      description: "Stock saludable",
    };

  return {
    label: "Alto",
    color: "primary",
    description: "Stock elevado",
  };
};

export const normalizeText = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, " ");
