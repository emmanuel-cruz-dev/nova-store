import { useState } from "react";
import { toast } from "react-toastify";

export const useProductQuantity = (maxStock, handleAddToCartClick) => {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const notify = (productsAdded) => {
    const message =
      productsAdded === 1
        ? `Se agregó 1 producto al carrito`
        : `Se agregaron ${productsAdded} productos al carrito`;

    toast.success(message);
  };

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= maxStock) {
      setQuantity(value);
    }
  };

  const handleAddWithQuantity = () => {
    setIsAddingToCart(true);
    handleAddToCartClick(quantity);

    setTimeout(() => {
      notify(quantity);
      setIsAddingToCart(false);
      setQuantity(1);
    }, 50);
  };

  return {
    quantity,
    isAddingToCart,
    handleIncrement,
    handleDecrement,
    handleQuantityChange,
    handleAddWithQuantity,
  };
};
