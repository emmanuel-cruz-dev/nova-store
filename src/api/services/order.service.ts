import axiosInstance from "../config/axiosConfig";
import { Order, CreateOrderDTO, User } from "../../types";

const getUserOrders = async (userId: number) => {
  try {
    const { data } = await axiosInstance.get<User>(`/users/${userId}`);
    const orders = data.orders || [];
    return orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching user orders", error);
    throw error;
  }
};

const createOrder = async (order: CreateOrderDTO) => {
  try {
    const userResponse = await axiosInstance.get<User>(
      `/users/${order.userId}`
    );
    const user = userResponse.data;

    const newOrder: Order = {
      id: crypto.randomUUID(),
      ...order,
      createdAt: new Date().toISOString(),
    };

    const updatedOrders = [...(user.orders || []), newOrder];

    await axiosInstance.put<User>(`/users/${order.userId}`, {
      ...user,
      orders: updatedOrders,
    });

    return newOrder;
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};

const getOrderById = async (userId: number, orderId: string) => {
  try {
    const { data } = await axiosInstance.get<User>(`/users/${userId}`);
    const orders = data.orders || [];
    return orders.find((order) => order.id === orderId);
  } catch (error) {
    console.error("Error fetching order", error);
    throw error;
  }
};

const updateOrderStatus = async (
  userId: number,
  orderId: string,
  status: Order["status"]
) => {
  try {
    const { data } = await axiosInstance.get<User>(`/users/${userId}`);
    const user = data;

    const updatedOrders = (user.orders || []).map((order) =>
      order.id === orderId
        ? { ...order, status, updatedAt: new Date().toISOString() }
        : order
    );

    await axiosInstance.put<User>(`/users/${userId}`, {
      ...user,
      orders: updatedOrders,
    });

    return updatedOrders.find((order) => order.id === orderId);
  } catch (error) {
    console.error("Error updating order status", error);
    throw error;
  }
};

const deleteOrder = async (userId: number, orderId: string) => {
  try {
    const { data } = await axiosInstance.get<User>(`/users/${userId}`);
    const user = data;

    const updatedOrders = (user.orders || []).filter(
      (order) => order.id !== orderId
    );

    await axiosInstance.put<User>(`/users/${userId}`, {
      ...user,
      orders: updatedOrders,
    });

    return updatedOrders;
  } catch (error) {
    console.error("Error deleting order", error);
    throw error;
  }
};

const getAllOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await axiosInstance.get<User[]>("/users");

    const allOrders: Order[] = [];

    data.forEach((user) => {
      if (user.orders && user.orders.length > 0) {
        user.orders.forEach((order) => {
          allOrders.push({
            ...order,
            userName: `${user.firstName} ${user.lastName}`,
            userEmail: user.email,
          } as any);
        });
      }
    });

    return allOrders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error("Error fetching all orders", error);
    throw error;
  }
};

export const orderService = {
  getUserOrders,
  createOrder,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
  getAllOrders,
};
