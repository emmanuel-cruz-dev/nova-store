import { DashboardStats } from "../types";

export const orderSummaryItems = (stats: DashboardStats) => [
  {
    label: "Pendientes",
    value: stats.orders.pendingOrders,
    variant: "warning",
  },
  {
    label: "En Proceso",
    value: stats.orders.processingOrders,
    variant: "info",
  },
  {
    label: "Completadas",
    value: stats.orders.completedOrders,
    variant: "success",
  },
  {
    label: "Canceladas",
    value: stats.orders.cancelledOrders,
    variant: "danger",
  },
];
