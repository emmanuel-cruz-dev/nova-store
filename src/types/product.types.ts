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
  categories: number[];
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
