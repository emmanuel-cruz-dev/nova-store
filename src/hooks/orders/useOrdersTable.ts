import { useState, MouseEvent } from "react";
import { toast } from "react-toastify";
import { useOrders, useDeleteOrder } from "./useOrders";
import { Order } from "../../types";

export const useOrdersTable = (userId: number) => {
  const { orders, isLoading, error } = useOrders(userId);
  const { deleteOrder, loading: deletingOrder } = useDeleteOrder();
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);

  const handleDeleteOrder = async (order: Order, e: MouseEvent) => {
    e.stopPropagation();

    if (deletingOrder) return;

    setDeletingOrderId(order.id);

    try {
      await deleteOrder(userId, order.id);
      toast.success("La órden ha sido eliminada");
    } catch (error) {
      console.error("Error al eliminar la órden", error);
      toast.error("Error al eliminar la órden. Intenta nuevamente.");
    } finally {
      setDeletingOrderId(null);
    }
  };

  const isOrderDeleting = (orderId: string) => deletingOrderId === orderId;

  return {
    orders,
    isLoading,
    error,
    deletingOrder,
    handleDeleteOrder,
    isOrderDeleting,
  };
};
