import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProductById } from "./index";
import { useCreateProduct, useUpdateProduct } from "./useProducts";
import { productSchema, ProductFormData } from "../schemas/productSchema";
import { NotificationType } from "../types";

export function useProductForm(
  productId: number,
  onUpdate: (message: string, type: NotificationType) => void,
  onSuccess: () => void
) {
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

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      rating: 0,
      brand: "",
      category: "",
      isActive: true,
      image: "",
    },
  });

  const saving = loadingUpdate || loadingCreate || isSubmitting;
  const loading = loadingUpdate || loadingCreate;
  const error = errorProduct || errorUpdate || errorCreate;

  useEffect(() => {
    if (product && isEditMode) {
      reset({
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
    }
  }, [product, isEditMode, reset]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isEditMode) {
        await updateProduct(productId, data);
        onUpdate("Producto actualizado exitosamente", "success");
      } else {
        await createProduct(data);
        onUpdate("Producto creado exitosamente", "success");
      }
      onSuccess();
    } catch (error) {
      onUpdate(
        `Error al ${isEditMode ? "actualizar" : "crear"} el producto`,
        "error"
      );
      console.error(
        `Error al ${isEditMode ? "actualizar" : "crear"} el producto:`,
        error
      );
    }
  };

  const resetForm = () => {
    reset({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      rating: 0,
      brand: "",
      category: "",
      isActive: true,
      image: "",
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    watch,
    loadingProduct,
    saving,
    loading,
    error,
    errorUpdate,
    isEditMode,
    resetForm,
  };
}
