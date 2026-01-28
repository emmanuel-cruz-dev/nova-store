import { useCartStore } from "../../stores";

export const useCart = () => {
  const cart = useCartStore((state) => state.cart);
  const handleAddToCart = useCartStore((state) => state.handleAddToCart);
  const handleRemoveFromCart = useCartStore(
    (state) => state.handleRemoveFromCart
  );
  const handleDecreaseQuantity = useCartStore(
    (state) => state.handleDecreaseQuantity
  );
  const handleClearCart = useCartStore((state) => state.handleClearCart);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const getCartItemsCount = useCartStore((state) => state.getCartItemsCount);

  return {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleDecreaseQuantity,
    handleClearCart,
    getCartTotal,
    getCartItemsCount,
  };
};
