import useSWR from "swr";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { orderService } from "../../api";
import { Order, CreateOrderDTO, ErrorType } from "../../types";

export const useOrders = (userId: number) => {
  const {
    data,
    error,
    isLoading,
    mutate: mutateOrders,
  } = useSWR<Order[], ErrorType>(
    userId ? ["orders", userId] : null,
    () => orderService.getUserOrders(userId),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    orders: data || [],
    isLoading,
    error,
    refetch: mutateOrders,
  };
};

export const useOrderById = (userId: number, orderId: string) => {
  const { data, error, isLoading } = useSWR<Order | null, ErrorType>(
    userId && orderId ? ["order", userId, orderId] : null,
    () => orderService.getOrderById(userId, orderId) as Promise<Order | null>,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    order: data || null,
    isLoading,
    error,
  };
};

export const useAllOrders = () => {
  const { data, error, isLoading } = useSWR<Order[], ErrorType>(
    "allOrders",
    orderService.getAllOrders,
    {
      revalidateOnFocus: false,
    }
  );

  return {
    orders: data || [],
    isLoading,
    error,
  };
};

export const useCreateOrder = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Order,
    ErrorType,
    string,
    CreateOrderDTO & { userId: number }
  >("createOrder", async (_, { arg }) => {
    return await orderService.createOrder(arg);
  });

  const createOrder = async (
    orderData: CreateOrderDTO & { userId: number }
  ) => {
    const result = await trigger(orderData);

    await mutate(["orders", orderData.userId]);

    return result;
  };

  return {
    createOrder,
    loading: isMutating,
    error,
  };
};

export const useDeleteOrder = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Order[],
    ErrorType,
    string,
    { userId: number; orderId: string }
  >(
    "deleteOrder",
    async (
      _,
      { arg: { userId, orderId } }: { arg: { userId: number; orderId: string } }
    ) => {
      const result = await orderService.deleteOrder(userId, orderId);
      await mutate(["orders", userId]);
      return result;
    }
  );

  return {
    deleteOrder: (userId: number, orderId: string) =>
      trigger({ userId, orderId }),
    loading: isMutating,
    error,
  };
};

export const useUpdateOrderStatus = () => {
  const { trigger, isMutating, error } = useSWRMutation<
    Order,
    ErrorType,
    string,
    { userId: number; orderId: string; status: Order["status"] }
  >("updateOrderStatus", async (_, { arg }) => {
    const { userId, orderId, status } = arg;
    const result = await orderService.updateOrderStatus(
      userId,
      orderId,
      status
    );

    if (!result) {
      throw new Error("Order not found");
    }

    return result;
  });

  const updateOrderStatus = async (
    userId: number,
    orderId: string,
    status: Order["status"]
  ) => {
    const result = await trigger({ userId, orderId, status });

    await mutate(["order", userId, orderId]);
    await mutate(["orders", userId]);

    return result;
  };

  return {
    updateOrderStatus,
    loading: isMutating,
    error,
  };
};
