import { useEffect, useState } from "react";
import { useProductById } from "./index";
import { useCreateProduct, useUpdateProduct } from "./useProducts";
import { validateProductForm } from "../utils/productValidations";
import { productInitialFormData } from "../data/productInitialFormData";

export function useProductForm(productId, onUpdate, onSuccess) {
  const isEditMode = !!productId;

  const {
    product,
    loading: loadingProduct,
    error: errorProduct,
  } = useProductById(productId);

  const {
    updateProduct,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useUpdateProduct();

  const {
    createProduct,
    loading: loadingCreate,
    error: errorCreate,
  } = useCreateProduct();

  const [formData, setFormData] = useState(productInitialFormData);
  const [validationErrors, setValidationErrors] = useState({});

  const saving = loadingUpdate || loadingCreate;
  const loading = loadingUpdate || loadingCreate;
  const error = errorProduct || errorUpdate || errorCreate;

  useEffect(() => {
    if (product && isEditMode) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        stock: product.stock || 0,
        rating: product.rating || 0,
        brand: product.brand || "",
        category: product.category || "",
        isActive: product.isActive ?? true,
        image: product.image || "",
      });
    } else if (!isEditMode) {
      setFormData(productInitialFormData);
    }
  }, [product, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value) || ""
          : value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleIsActiveChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      isActive: value === "true",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseFloat(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 0,
    };

    const errors = validateProductForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      if (isEditMode) {
        await updateProduct(productId, dataToSend);
        onUpdate("Producto actualizado exitosamente", "success");
      } else {
        await createProduct(dataToSend);
        onUpdate("Producto creado exitosamente", "success");
      }

      onSuccess();
    } catch (error) {
      if (onUpdate) {
        onUpdate(
          `Error al ${isEditMode ? "actualizar" : "crear"} el producto`,
          "error"
        );
      }
      console.error(
        `Error al ${isEditMode ? "actualizar" : "crear"} el producto:`,
        error
      );
    }
  };

  const resetForm = () => {
    setFormData(productInitialFormData);
    setValidationErrors({});
  };

  return {
    formData,
    validationErrors,
    loadingProduct,
    saving,
    loading,
    error,
    errorUpdate,
    isEditMode,
    handleChange,
    handleIsActiveChange,
    handleSubmit,
    resetForm,
  };
}
