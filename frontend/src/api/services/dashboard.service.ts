import { productService, orderService, userService } from "../../api";
import {
  calculateSalesStats,
  calculateProductStats,
  calculateOrderStats,
  calculateUserStats,
} from "../../utils";
import { DashboardStats } from "../../types";

const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const [products, orders, users] = await Promise.all([
      productService.getAllProducts(),
      orderService.getAllOrders(),
      userService.getCustomerUsers(),
    ]);

    const sales = calculateSalesStats(orders);
    const productStats = calculateProductStats(products, orders);
    const orderStats = calculateOrderStats(orders);
    const userStats = calculateUserStats(users);

    return {
      sales,
      products: productStats,
      orders: orderStats,
      users: userStats,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats", error);
    throw error;
  }
};

export const dashboardService = {
  getDashboardStats,
};
