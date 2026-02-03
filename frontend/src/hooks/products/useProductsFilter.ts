import { useState, useEffect, useMemo } from "react";
import {
  Product,
  UseProductsFilterReturn,
  StockLevel,
  ProductStatus,
} from "../../types";
import { normalizeText } from "../../utils";

export function useProductsFilter(
  products: Product[],
  itemsPerPage = 10
): UseProductsFilterReturn {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProductStatus>("all");
  const [stockFilter, setStockFilter] = useState<StockLevel>("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, stockFilter, minPrice, maxPrice]);

  const getStockLevel = (stock: number): StockLevel => {
    if (stock === 0) return "critical";
    if (stock <= 5) return "low";
    if (stock <= 20) return "ok";
    return "high";
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      const normalizedSearch = normalizeText(searchTerm);
      const normalizedName = normalizeText(product.name);
      const normalizedBrand = normalizeText(product.brand);

      const matchesSearch =
        searchTerm === "" ||
        normalizedName.includes(normalizedSearch) ||
        normalizedBrand.includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && product.isActive) ||
        (statusFilter === "inactive" && !product.isActive);

      const productStockLevel = getStockLevel(product.stock);
      const matchesStock =
        stockFilter === "all" || productStockLevel === stockFilter;

      const matchesMinPrice =
        minPrice === "" || product.price >= Number(minPrice);
      const matchesMaxPrice =
        maxPrice === "" || product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesStock &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [products, searchTerm, statusFilter, stockFilter, minPrice, maxPrice]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const hasActiveFilters =
    searchTerm !== "" ||
    statusFilter !== "all" ||
    stockFilter !== "all" ||
    minPrice !== "" ||
    maxPrice !== "";

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setStockFilter("all");
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
    statusFilter,
    stockFilter,
    minPrice,
    maxPrice,
    hasActiveFilters,
    setSearchTerm,
    setStatusFilter,
    setStockFilter,
    setMinPrice,
    setMaxPrice,
    clearFilters,
    handlePageChange,
  };
}
