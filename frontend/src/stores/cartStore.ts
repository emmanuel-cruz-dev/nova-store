import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore, ProductToAdd } from "../types";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      handleAddToCart: (product: ProductToAdd, quantity = 1) => {
        const { cart } = get();
        const existingProductIndex = cart.findIndex((p) => p.id === product.id);

        if (existingProductIndex !== -1) {
          const newCart = cart.map((item, index) =>
            index === existingProductIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ cart: newCart });
        } else {
          set({ cart: [...cart, { ...product, quantity }] });
        }
      },

      handleRemoveFromCart: (product: ProductToAdd) => {
        const { cart } = get();
        const newCart = cart.filter((p) => p.id !== product.id);
        set({ cart: newCart });
      },

      handleDecreaseQuantity: (product: ProductToAdd) => {
        const { cart, handleRemoveFromCart } = get();
        const existingProductIndex = cart.findIndex((p) => p.id === product.id);

        if (existingProductIndex !== -1) {
          const existingProduct = cart[existingProductIndex];

          if (existingProduct.quantity > 1) {
            const newCart = cart.map((item, index) =>
              index === existingProductIndex
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
            set({ cart: newCart });
          } else {
            handleRemoveFromCart(product);
          }
        }
      },

      handleClearCart: () => {
        set({ cart: [] });
      },

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getCartItemsCount: () => {
        const { cart } = get();
        return cart.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
