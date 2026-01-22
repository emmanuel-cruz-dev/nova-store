import { useState, useEffect, useMemo } from "react";
import { Product, UseProductsPublicFilterReturn } from "../../types";
import { normalizeText } from "../../utils";

export function useProductsPublicFilter(
  products: Product[],
  itemsPerPage = 6
): UseProductsPublicFilterReturn {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, minPrice, maxPrice]);

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      const normalizedSearch = normalizeText(searchTerm);
      const normalizedName = normalizeText(product.name);
      const normalizedDescription = normalizeText(product.description);
      const normalizedBrand = normalizeText(product.brand);

      const matchesText =
        searchTerm === "" ||
        normalizedName.includes(normalizedSearch) ||
        normalizedDescription.includes(normalizedSearch) ||
        normalizedBrand.includes(normalizedSearch);

      const matchesMin = minPrice === "" || product.price >= Number(minPrice);
      const matchesMax = maxPrice === "" || product.price <= Number(maxPrice);

      return matchesText && matchesMin && matchesMax;
    });
  }, [products, searchTerm, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const hasActiveFilters =
    searchTerm !== "" || minPrice !== "" || maxPrice !== "";

  const clearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    filteredProducts,
    paginatedProducts,
    currentPage,
    totalPages,
    searchTerm,
    minPrice,
    maxPrice,
    hasActiveFilters,
    setSearchTerm,
    setMinPrice,
    setMaxPrice,
    clearFilters,
    handlePageChange,
  };
}
