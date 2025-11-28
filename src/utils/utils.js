export function formatPrice(price) {
  return price.toLocaleString("ar-AR", {
    currency: "ARS",
    minimumFractionDigits: 0,
  });
}

export function handleRetry() {
  window.location.reload();
}

export function priceInstallments(price) {
  const newPrice = Math.floor(price / 6);
  return formatPrice(newPrice);
}

export function renderCategory(category) {
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

export const isValidUrl = (string) =>
  string.match(
    /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/
  );

export const validateLoginForm = (loginData) => {
  const errors = {};

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

export const validateRegisterForm = (formData) => {
  const errors = {};

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

export const getColSize = (displayCategories) => {
  const count = displayCategories.length;
  if (count === 1) return 12;
  if (count === 2) return 6;
  if (count === 3) return 4;
  return 3;
};

export function formatDateShort(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "numeric",
    year: "2-digit",
  });
}

export function formatDateDetailed(dateString) {
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
