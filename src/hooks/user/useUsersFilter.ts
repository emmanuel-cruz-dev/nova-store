import { useState, useEffect, useMemo } from "react";
import { normalizeText } from "../../utils";
import {
  User,
  UseUsersFilterReturn,
  ActivityFilter,
  DateFilter,
} from "../../types";

export function useUsersFilter(
  users: User[],
  itemsPerPage = 10
): UseUsersFilterReturn {
  const [searchTerm, setSearchTerm] = useState("");
  const [activityFilter, setActivityFilter] = useState<ActivityFilter>("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activityFilter, dateFilter]);

  const filterByDate = (createdAt: string): boolean => {
    if (dateFilter === "all") return true;

    const userDate = new Date(createdAt);
    const now = new Date();
    const daysDiff = Math.floor(
      (now.getTime() - userDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    switch (dateFilter) {
      case "last-week":
        return daysDiff <= 7;
      case "last-month":
        return daysDiff <= 30;
      case "last-3-months":
        return daysDiff <= 90;
      case "older":
        return daysDiff > 90;
      default:
        return true;
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user: User) => {
      const normalizedSearch = normalizeText(searchTerm);
      const normalizedFullName = normalizeText(
        `${user.firstName} ${user.lastName}`
      );
      const normalizedEmail = normalizeText(user.email);

      const matchesSearch =
        searchTerm === "" ||
        normalizedFullName.includes(normalizedSearch) ||
        normalizedEmail.includes(normalizedSearch);

      const hasOrders = (user.orders?.length || 0) > 0;
      const matchesActivity =
        activityFilter === "all" ||
        (activityFilter === "active" && hasOrders) ||
        (activityFilter === "inactive" && !hasOrders);

      const matchesDate = user.createdAt
        ? filterByDate(user.createdAt as string)
        : true;

      return matchesSearch && matchesActivity && matchesDate;
    });
  }, [users, searchTerm, activityFilter, dateFilter]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const hasActiveFilters =
    searchTerm !== "" || activityFilter !== "all" || dateFilter !== "all";

  const clearFilters = () => {
    setSearchTerm("");
    setActivityFilter("all");
    setDateFilter("all");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    filteredUsers,
    paginatedUsers,
    currentPage,
    totalPages,
    searchTerm,
    activityFilter,
    dateFilter,
    hasActiveFilters,
    setSearchTerm,
    setActivityFilter,
    setDateFilter,
    clearFilters,
    handlePageChange,
  };
}
