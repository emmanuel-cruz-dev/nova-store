import { ReactNode, useState } from "react";
import { CartContext } from "../hooks";
import { Product } from "../types";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      const newCart = cart.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const handleRemoveFromCart = (product: Product) => {
    const newCart = cart.filter((p) => p.id !== product.id);
    setCart(newCart);
  };

  const handleDecreaseQuantity = (product: Product) => {
    const existingProductIndex = cart.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      const existingProduct = cart[existingProductIndex];

      if (existingProduct.quantity > 1) {
        const newCart = cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        setCart(newCart);
      } else {
        handleRemoveFromCart(product);
      }
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveFromCart,
        handleDecreaseQuantity,
        handleClearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
