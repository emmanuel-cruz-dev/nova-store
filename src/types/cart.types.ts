import { Product } from "./product.types";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  handleAddToCart: (product: Product) => void;
  handleRemoveFromCart: (product: Product) => void;
  handleDecreaseQuantity: (product: Product) => void;
  handleClearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

export interface CartItemProps {
  product: CartItem;
  index: number;
}
