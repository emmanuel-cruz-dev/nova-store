import { ProductToAdd } from "./product.types";

export interface CartItem extends ProductToAdd {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  handleAddToCart: (product: ProductToAdd, quantity?: number) => void;
  handleRemoveFromCart: (product: ProductToAdd) => void;
  handleDecreaseQuantity: (product: ProductToAdd) => void;
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

export type OrderData = {
  total: number;
  itemsCount: number;
};
