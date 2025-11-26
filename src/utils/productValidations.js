export const isValidUrl = (string) => {
  if (!string) return true;
  try {
    new URL(string);
    return true;
  } catch (error) {
    console.error("Error al validar la URL:", error);
    return false;
  }
};

export const validateProductForm = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "El nombre es requerido";
  } else if (formData.name.length > 100) {
    errors.name = "El nombre no puede exceder 100 caracteres";
  }

  if (formData.description.length > 300) {
    errors.description = "La descripción no puede exceder 300 caracteres";
  }

  if (!formData.price || formData.price <= 0) {
    errors.price = "El precio debe ser mayor a 0";
  } else if (formData.price > 999999) {
    errors.price = "El precio es demasiado alto";
  }

  if (formData.stock === "" || formData.stock < 0) {
    errors.stock = "El stock no puede ser negativo";
  } else if (formData.stock > 999999) {
    errors.stock = "El stock es demasiado alto";
  }

  if (formData.rating !== "" && (formData.rating < 0 || formData.rating > 5)) {
    errors.rating = "El rating debe estar entre 0 y 5";
  }

  if (formData.brand.length > 50) {
    errors.brand = "La marca no puede exceder 50 caracteres";
  }

  if (!formData.category) {
    errors.category = "La categoría es requerida";
  }

  if (formData.image && !isValidUrl(formData.image)) {
    errors.image = "Debe ser una URL válida";
  }

  return errors;
};
