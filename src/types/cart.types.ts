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

export interface SummaryRowProps {
  label: string;
  value: string | number;
  className?: string;
  valueClassName?: string;
}

export interface CheckoutSummaryProps {
  orderTotal: number;
  itemsCount: number;
}

export interface CheckoutModalProps {
  show: boolean;
  onHide: () => void;
  orderTotal: number;
  itemsCount: number;
}
