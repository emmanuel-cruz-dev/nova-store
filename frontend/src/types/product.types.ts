import { ChangeEvent, FormEvent } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ValidationErrors } from "./common.types";
import { ProductFormData } from "../schemas/productSchema";
import { ApiError } from "./user.types";

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  rating: number;
  isActive: boolean;
}

export type ProductToAdd = Pick<
  Product,
  "id" | "name" | "brand" | "price" | "category" | "description" | "image"
>;

export interface ProductCardProps extends Partial<Product> {
  isLoading?: boolean;
}

export type CreateProductDTO = Omit<Product, "id">;

export interface CategoriesProps {
  eyebrow: string;
  heading?: string;
  categories: string[];
  maxCategories?: number | null;
}

export interface CategoryDataProps {
  id: string;
  name: string;
  image: string;
}

export interface ProductItemProps {
  product: Product;
}

export interface ProductQuantitySelectorProps {
  quantity: number;
  stock: number;
  isAddingToCart: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onQuantityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddToCart: () => void;
}

export interface ProductsGalleryProps {
  products: Product[];
  loading: boolean;
  error: ApiError;
}

export interface ProductsSlideListProps extends ProductsGalleryProps {
  eyebrow: string;
  heading: string;
}

export interface ProductResponse {
  data: Product[];
  total: number;
}

export type ErrorType = ApiError;

export interface ProductDetailsCardProps {
  product: Product | null;
  isLoading: boolean;
}

export type OnUpdate = (
  message: string,
  type: "success" | "error" | string
) => void;

export interface ProductSidebarFormProps {
  show: boolean;
  onHide: () => void;
  productId: number;
  onUpdate: OnUpdate;
  onSuccess: () => void;
}

export type NotificationType = "success" | "error" | "info" | "warning";

export interface UseProductFormParams {
  productId?: string | number | null;
  onUpdate: (message: string, type: NotificationType) => void;
  onSuccess: () => void;
}

export interface UseProductFormReturn {
  formData: CreateProductDTO;
  validationErrors: ValidationErrors;
  loadingProduct: boolean;
  saving: boolean;
  loading: boolean;
  error: Error | null;
  errorUpdate: Error | null;
  isEditMode: boolean;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleIsActiveChange: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
}

export interface ProductFormProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  watch: <K extends keyof ProductFormData>(field: K) => ProductFormData[K];
  setValue: UseFormSetValue<ProductFormData>;
  error?: Error | null;
  errorUpdate?: Error | null;
}

export type StockLevel = "all" | "critical" | "low" | "ok" | "high";
export type ProductStatus = "all" | "active" | "inactive";

export interface ProductFiltersCommon {
  searchTerm: string;
  statusFilter: ProductStatus;
  stockFilter: StockLevel;
  minPrice: string | number;
  maxPrice: string | number;
  hasActiveFilters: boolean;
  setSearchTerm: (value: string) => void;
  setStatusFilter: (value: ProductStatus) => void;
  setStockFilter: (value: StockLevel) => void;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  clearFilters: () => void;
}

export interface UseProductsFilterReturn extends ProductFiltersCommon {
  filteredProducts: Product[];
  paginatedProducts: Product[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

type StockStatusFilter =
  | "statusFilter"
  | "stockFilter"
  | "setStatusFilter"
  | "setStockFilter";

export interface UseProductsPublicFilterReturn
  extends Omit<ProductFiltersCommon, StockStatusFilter> {
  filteredProducts: Product[];
  paginatedProducts: Product[];
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => void;
  setMaxPrice: (value: string) => void;
  setCurrentPage: (value: number) => void;
}

export interface PublicProductFiltersProps
  extends Omit<ProductFiltersCommon, StockStatusFilter> {
  productsCount: number;
  filteredCount: number;
  loading: boolean;
}
