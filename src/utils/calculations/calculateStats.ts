import {
  Order,
  OrderStats,
  Product,
  ProductStats,
  SalesStats,
  TopProduct,
  User,
  UserStats,
} from "../../types";

export const calculateSalesStats = (orders: Order[]): SalesStats => {
  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );

  const totalRevenue = completedOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );
  const totalSales = completedOrders.length;
  const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

  return {
    totalRevenue,
    averageOrderValue,
    totalSales,
  };
};

export const calculateProductStats = (
  products: Product[],
  orders: Order[]
): ProductStats => {
  const activeProducts = products.filter((p) => p.isActive).length;
  const inactiveProducts = products.filter((p) => !p.isActive).length;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;

  const productSales = new Map<
    number,
    { product: Product; unitsSold: number; revenue: number }
  >();

  orders
    .filter((order) => order.status === "completed")
    .forEach((order) => {
      order.items.forEach((item) => {
        const existing = productSales.get(item.productId);
        if (existing) {
          existing.unitsSold += item.quantity;
          existing.revenue += item.price * item.quantity;
        } else {
          const product = products.find((p) => p.id === item.productId);
          if (product) {
            productSales.set(item.productId, {
              product,
              unitsSold: item.quantity,
              revenue: item.price * item.quantity,
            });
          }
        }
      });
    });

  const topProducts: TopProduct[] = Array.from(productSales.values())
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, 5)
    .map((item) => ({
      id: item.product.id,
      name: item.product.name,
      category: item.product.category,
      unitsSold: item.unitsSold,
      revenue: item.revenue,
      image: item.product.image,
    }));

  return {
    totalProducts: products.length,
    activeProducts,
    inactiveProducts,
    lowStockProducts,
    topProducts,
  };
};

export const calculateOrderStats = (orders: Order[]): OrderStats => {
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const processingOrders = orders.filter(
    (o) => o.status === "processing"
  ).length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const cancelledOrders = orders.filter((o) => o.status === "cancelled").length;

  const ordersByStatus = [
    {
      status: "pending",
      count: pendingOrders,
      percentage: totalOrders > 0 ? (pendingOrders / totalOrders) * 100 : 0,
    },
    {
      status: "processing",
      count: processingOrders,
      percentage: totalOrders > 0 ? (processingOrders / totalOrders) * 100 : 0,
    },
    {
      status: "completed",
      count: completedOrders,
      percentage: totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0,
    },
    {
      status: "cancelled",
      count: cancelledOrders,
      percentage: totalOrders > 0 ? (cancelledOrders / totalOrders) * 100 : 0,
    },
  ];

  return {
    totalOrders,
    pendingOrders,
    processingOrders,
    completedOrders,
    cancelledOrders,
    ordersByStatus,
  };
};

export const calculateUserStats = (users: User[]): UserStats => {
  const totalUsers = users.length;
  const totalCustomers = users.filter((u) => u.role === "customer").length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalSuperAdmins = users.filter((u) => u.role === "super_admin").length;

  return {
    totalUsers,
    totalCustomers,
    totalAdmins,
    totalSuperAdmins,
  };
};
