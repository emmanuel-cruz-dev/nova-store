import { OrderData, CartItem } from "./cart.types";

export interface CheckoutState {
  showModal: boolean;
  orderData: OrderData | null;
  isProcessing: boolean;

  setShowModal: (show: boolean) => void;
  setOrderData: (data: OrderData | null) => void;
  handleCheckout: (
    userId: number,
    cart: CartItem[],
    getCartTotal: () => number,
    getCartItemsCount: () => number,
    handleClearCart: () => void
  ) => Promise<void>;
  handleCloseModal: () => void;
  calculateTotal: (cartTotal: number) => number;
}
