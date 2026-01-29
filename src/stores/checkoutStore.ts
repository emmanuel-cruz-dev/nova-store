import { create } from "zustand";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { orderService } from "../api";
import { CheckoutState, CreateOrderDTO, OrderItem } from "../types";

export const useCheckoutStore = create<CheckoutState>((set) => ({
  showModal: false,
  orderData: null,
  isProcessing: false,

  setShowModal: (show) => set({ showModal: show }),

  setOrderData: (data) => set({ orderData: data }),

  calculateTotal: (cartTotal: number) => {
    const shipping = cartTotal > 100000 ? 0 : 5000;
    return cartTotal + shipping;
  },

  handleCheckout: async (
    userId,
    cart,
    getCartTotal,
    getCartItemsCount,
    handleClearCart
  ) => {
    if (!userId) {
      toast.error("Debes iniciar sesión para realizar una compra");
      return;
    }

    if (cart.length === 0) {
      toast.error("Tu carrito está vacío");
      return;
    }

    set({ isProcessing: true });

    try {
      const subtotal = getCartTotal();
      const shipping = subtotal > 100000 ? 0 : 5000;
      const total = subtotal + shipping;

      const orderItems: OrderItem[] = cart.map((item) => ({
        productId: item.id,
        productTitle: item.name,
        productImage: item.image || "",
        quantity: item.quantity,
        price: item.price,
      }));

      const newOrder: CreateOrderDTO = {
        userId,
        items: orderItems,
        subtotal,
        shipping,
        total,
        status: "pending",
      };

      const newOrderResponse = await orderService.createOrder(newOrder);

      await mutate(["orders", userId]);

      set({
        orderData: {
          total,
          orderId: newOrderResponse.id,
          itemsCount: getCartItemsCount(),
        },
        showModal: true,
      });

      handleClearCart();
    } catch (error) {
      console.error("Error al procesar la orden:", error);
      toast.error("Hubo un error al procesar tu orden. Intenta nuevamente.");
    } finally {
      set({ isProcessing: false });
    }
  },

  handleCloseModal: () => {
    set({ showModal: false, orderData: null });
  },
}));
