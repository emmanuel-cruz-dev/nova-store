import { useState } from "react";
import useSWR from "swr";
import { toast } from "react-toastify";
import { orderService } from "../../api/services/order.service";
import { Order } from "../../types";

export const useAdminOrders = () => {
  const {
    data: orders,
    error,
    isLoading,
    mutate,
  } = useSWR<Order[]>("/admin/orders", orderService.getAllOrders, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
  });

  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const handleUpdateStatus = async (
    userId: number,
    orderId: string,
    newStatus: Order["status"]
  ) => {
    try {
      setUpdatingOrderId(orderId);

      await mutate(
        async (currentOrders) => {
          await orderService.updateOrderStatus(userId, orderId, newStatus);

          return currentOrders?.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          );
        },
        {
          optimisticData: orders?.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          ),

          revalidate: true,
          rollbackOnError: true,
        }
      );

      toast.success("Estado de la orden actualizado");
    } catch (error) {
      toast.error("Error al actualizar el estado");
      console.error(error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return {
    orders: orders || [],
    isLoading,
    error,
    handleUpdateStatus,
    updatingOrderId,
    mutate,
  };
};
