import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { ToastContainer, Bounce } from "react-toastify";
import { ProductInfoDisplay, ProductQuantitySelector } from "../index";
import { useAuth, useProductCard, useProductQuantity } from "../../hooks";

const ProductInfoCard = ({ product }) => {
  const { isAuthenticated } = useAuth();

  const { handleAddToCartClick } = useProductCard({
    id: product.id || 0,
    name: product.name || "",
    price: product.price || 0,
    category: product.category || "",
    description: product.description || "",
    image: product.image || "",
  });

  const {
    quantity,
    isAddingToCart,
    handleIncrement,
    handleDecrement,
    handleQuantityChange,
    handleAddWithQuantity,
  } = useProductQuantity(product.stock, handleAddToCartClick);

  return (
    <Card className="shadow-sm border-0 mb-3">
      <Card.Body>
        <ProductInfoDisplay product={product} />

        {isAuthenticated ? (
          <ProductQuantitySelector
            quantity={quantity}
            stock={product.stock}
            isAddingToCart={isAddingToCart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddWithQuantity}
          />
        ) : (
          <Link to="/login">
            <Button variant="primary" className="w-100 py-2">
              Inicia sesión para añadir al carrito
            </Button>
          </Link>
        )}
      </Card.Body>
      <ToastContainer
        position="bottom-left"
        pauseOnHover={true}
        theme="dark"
        transition={Bounce}
      />
    </Card>
  );
};

export default ProductInfoCard;
