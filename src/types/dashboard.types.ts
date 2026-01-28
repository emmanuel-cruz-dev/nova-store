interface Trend {
  value: number;
  isPositive: boolean;
}

type StatCardVariant = "primary" | "success" | "warning" | "danger" | "info";

export interface RevenueByMonth {
  month: string;
  revenue: number;
}

export interface TopProduct {
  id: number;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  image: string;
}

export interface OrderStatus {
  status: string;
  count: number;
  percentage: number;
}

export interface SalesStats {
  totalRevenue: number;
  averageOrderValue: number;
  totalSales: number;
  revenueByMonth?: RevenueByMonth[];
}

export interface ProductStats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  lowStockProducts: number;
  topProducts?: TopProduct[];
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  ordersByStatus: OrderStatus[];
}

export interface UserStats {
  totalUsers: number;
  totalCustomers: number;
  totalAdmins: number;
  totalSuperAdmins: number;
  newUsersThisMonth?: number;
}

export interface DashboardStats {
  sales: SalesStats;
  products: ProductStats;
  orders: OrderStats;
  users: UserStats;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: Trend;
  variant?: StatCardVariant;
  isLoading?: boolean;
}
