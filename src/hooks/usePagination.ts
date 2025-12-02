import { useState } from "react";

export const usePagination = (itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(newPage);
  };

  const paginate = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const getTotalPages = (totalItems) => {
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
