import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteProduct, useProducts } from "..";
import { Product } from "../../types";

export function useProductsTable(initialPage = 1, initialLimit = 10) {
  const {
    products,
    loading,
    error,
    refetch,
    page,
    limit,
    totalProducts,
    goToPage,
  } = useProducts(initialPage, initialLimit, "all");

  const { deleteProduct, loading: loadingDelete } = useDeleteProduct();

  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setProductId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const totalPages = Math.ceil(totalProducts / limit);

  const notify = (message: string, type: "success" | "error" | string) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else {
      toast(message);
    }
  };

  const handleModalShow = () => {
    setShowModal(true);
    setProductId(null);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setProductId(null);
  };

  const handleProductSaved = () => {
    setShowModal(false);
    setProductId(null);
    refetch();
  };

  const handleEditProduct = (productId: number) => {
    setShowModal(true);
    setProductId(productId);
  };

  const handleDeleteProduct = (product: Product | null) => {
    setShowDeleteModal(true);
    setProductToDelete(product);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (loadingDelete || !productToDelete?.id) return;

    const productId = productToDelete.id;

    try {
      await deleteProduct(productId);
      notify("Producto eliminado exitosamente", "success");
      handleCloseDeleteModal();
      refetch();
    } catch (error) {
      notify("Error al eliminar producto", "error");
      console.error("Error al eliminar producto:", error);
    }
  };

  return {
    products,
    loading,
    error,
    page,
    totalPages,
    totalProducts,

    showModal,
    selectedProductId,
    showDeleteModal,
    productToDelete,
    loadingDelete,

    goToPage,
    refetch,
    notify,
    handleModalShow,
    handleModalClose,
    handleProductSaved,
    handleEditProduct,
    handleDeleteProduct,
    handleCloseDeleteModal,
    handleConfirmDelete,
  };
}
