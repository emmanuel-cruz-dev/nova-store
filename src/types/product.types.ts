import { FormEvent } from "react";
import { ValidationErrors } from "./common.types";

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
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddToCart: () => void;
}

export interface ProductsListProps {
  title: string;
  products: Product[];
  loading: boolean;
  error: any;
}

export interface ProductResponse {
  data: Product[];
  total: number;
}

export type ErrorType = any;

export interface ProductDetailsCardProps {
  product: Product | null;
  isLoading: boolean;
}

export type OnUpdate = (
  message: string,
  type: "success" | "error" | string
) => void;

export interface ProductModalFormProps {
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleIsActiveChange: (value: string) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  resetForm: () => void;
}

export interface ProductFormProps {
  formData: CreateProductDTO;
  validationErrors: ValidationErrors;
  error: any;
  errorUpdate: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleIsActiveChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
