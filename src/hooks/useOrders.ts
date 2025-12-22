import useSWR from "swr";
import { useAuthStore } from "../stores/authStore";
import { getUserOrders } from "../api/services/order.service";
import { Order } from "../types";

export const useOrders = () => {
  const { user } = useAuthStore();

  const {
    data: orders,
    error,
    isLoading,
    mutate,
  } = useSWR<Order[]>(
    user ? `/orders?userId=${user.id}` : null,
    () => getUserOrders(user!.id as number),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
    }
  );

  return {
    orders: orders || [],
    isLoading,
    error,
    mutate,
  };
};
