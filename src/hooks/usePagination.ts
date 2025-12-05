import { useState } from "react";
import { Product } from "../types";

export const usePagination = (itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(newPage);
  };

  const paginate = (items: Product[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const getTotalPages = (totalItems: number) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  return {
    currentPage,
    itemsPerPage,
    handlePageChange,
    paginate,
    getTotalPages,
    resetPage: () => setCurrentPage(1),
  };
};
