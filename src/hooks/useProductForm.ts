import { FormEvent, useEffect, useState } from "react";
import { useProductById } from "./index";
import { useCreateProduct, useUpdateProduct } from "./useProducts";
import { validateProductForm } from "../utils/productValidations";
import { productInitialFormData } from "../data/productInitialFormData";
import {
  CreateProductDTO,
  ValidationErrors,
  NotificationType,
  UseProductFormReturn,
} from "../types";

export function useProductForm(
  productId: number,
  onUpdate: (message: string, type: NotificationType) => void,
  onSuccess: () => void
): UseProductFormReturn {
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

  const [formData, setFormData] = useState<CreateProductDTO>(
    productInitialFormData
  );
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

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

  const handleIsActiveChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      isActive: value === "true",
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend: CreateProductDTO = {
      ...formData,
      price: formData.price || 0,
      stock: formData.stock || 0,
      rating: formData.rating || 0,
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
