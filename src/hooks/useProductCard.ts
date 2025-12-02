import { useCart } from "./useCart";

export const useProductCard = ({
  id,
  name,
  price,
  category,
  description,
  image,
}) => {
  const { handleAddToCart } = useCart();

  const handleAddToCartClick = (quantity = 1) => {
    const product = {
      id,
      name,
      price,
      category,
      description,
      image,
    };

    handleAddToCart(product, quantity);
  };

  return { handleAddToCartClick };
};
