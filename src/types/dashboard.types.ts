interface RevenueByMonth {
  month: string;
  revenue: number;
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

export interface TopProduct {
  id: number;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  image: string;
}

interface OrderStatus {
  status: string;
  count: number;
  percentage: number;
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
  newUsersThisMonth?: number;
}

export interface DashboardStats {
  sales: SalesStats;
  products: ProductStats;
  orders: OrderStats;
  users: UserStats;
}

type StatCardVariant = "primary" | "success" | "warning" | "danger" | "info";

interface Trend {
  value: number;
  isPositive: boolean;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<any>;
  trend?: Trend;
  variant?: StatCardVariant;
  isLoading?: boolean;
}
