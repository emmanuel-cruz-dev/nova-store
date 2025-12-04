import { useCart } from "./useCart";
import { ProductToAdd } from "../types";

export const useProductCard = ({
  id,
  name,
  brand,
  price,
  category,
  description,
  image,
}: ProductToAdd) => {
  const { handleAddToCart } = useCart();

  const handleAddToCartClick = (quantity = 1) => {
    const product = {
      id,
      name,
      brand,
      price,
      category,
      description,
      image,
    };

    handleAddToCart(product, quantity);
  };

  return { handleAddToCartClick };
};
