import { useState } from "react";
import { useCart } from "./useCart";

export const useCheckoutOrder = () => {
  const { getCartTotal, handleClearCart, getCartItemsCount } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const calculateTotal = () => {
    const subtotal = getCartTotal();
    const shipping = subtotal > 100000 ? 0 : 5000;
    return subtotal + shipping;
  };

  const handleCheckout = () => {
    setOrderData({
      total: calculateTotal(),
      itemsCount: getCartItemsCount(),
    });

    handleClearCart();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOrderData(null);
  };

  return {
    showModal,
    orderData,
    calculateTotal,
    handleCheckout,
    handleCloseModal,
  };
};
