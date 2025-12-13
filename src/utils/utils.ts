import { CategoryDataProps } from "../types";

export function formatPrice(price: number) {
  return price.toLocaleString("ar-AR", {
    currency: "ARS",
    minimumFractionDigits: 0,
  });
}

export function handleRetry() {
  window.location.reload();
}

export function priceInstallments(price: number) {
  const newPrice = Math.floor(price / 6);
  return formatPrice(newPrice);
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

export function formatDateShort(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "numeric",
    year: "2-digit",
  });
}

export function formatDateDetailed(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
