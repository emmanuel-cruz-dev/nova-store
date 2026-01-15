import useSWR from "swr";
import { dashboardService } from "../api/services/dashboard.service";
import { DashboardStats } from "../types";

export const useDashboard = () => {
  const {
    data: stats,
    error,
    isLoading,
    mutate,
  } = useSWR<DashboardStats>(
    "dashboard-stats",
    dashboardService.getDashboardStats,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000,
    }
  );

  return {
    stats,
    isLoading,
    error,
    refresh: mutate,
  };
};
