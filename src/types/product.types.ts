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
