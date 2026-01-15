export function formatPrice(price: number) {
  return price.toLocaleString("ar-AR", {
    currency: "ARS",
    minimumFractionDigits: 0,
  });
}

export function priceInstallments(price: number) {
  const newPrice = Math.floor(price / 6);
  return formatPrice(newPrice);
}

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
