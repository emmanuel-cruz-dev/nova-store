import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  Badge,
  InputGroup,
  Form,
} from "react-bootstrap";
import { ShoppingCart, Heart, Plus, Minus } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useAuth, useProductCard } from "../../hooks";
import StarRating from "../ui/StarRating";
import {
  formatPrice,
  priceInstallments,
  renderCategory,
} from "../../utils/utils";

const ProductInfoCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const notify = (productsAdded) => {
    const message =
      productsAdded === 1
        ? `Se agregó 1 producto al carrito`
        : `Se agregaron ${productsAdded} productos al carrito`;

    toast.success(message);
  };

  const { handleAddToCartClick } = useProductCard({
    id: product.id || 0,
    name: product.name || "",
    price: product.price || 0,
    category: product.category || "",
    description: product.description || "",
    image: product.image || "",
  });

  const handleIncrement = () => {
    if (quantity < product.stock) {
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
    if (!isNaN(value) && value >= 1 && value <= product.stock) {
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
    }, 300);
  };

  return (
    <Card className="shadow-sm border-0 mb-3">
      <Card.Body>
        <Badge bg="secondary" className="my-2 p-2">
          {renderCategory(product.category)}
        </Badge>
        <h2 className="fw-bold mt-3">{product.name}</h2>
        <p className="text-muted">Marca: {product.brand}</p>

        <StarRating rating={product.rating} />

        <div className="mb-4">
          <p className="display-6 fw-bold text-primary mb-0">
            ${formatPrice(product.price)}
          </p>
          <p className="text-muted mb-0">
            6 cuotas de ${priceInstallments(product.price)}
          </p>
        </div>

        <p className="text-muted mb-4">{product.description || ""}</p>

        <div className="mb-4">
          {product.stock > 0 ? (
            <Badge bg="success" className="p-2">
              En stock ({product.stock} disponibles)
            </Badge>
          ) : (
            <Badge bg="danger" className="px-3 py-2">
              Sin stock
            </Badge>
          )}
        </div>

        {isAuthenticated ? (
          <>
            {product.stock > 0 ? (
              <Row className="g-2 mb-3">
                <label className="form-label fw-semibold">Cantidad:</label>
                <Col xs={12} md={5} className="d-flex items-center">
                  <InputGroup style={{ maxWidth: "180px" }}>
                    <Button
                      variant="outline-secondary"
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </Button>
                    <Form.Control
                      type="number"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="text-center"
                      min="1"
                      max={product.stock}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={handleIncrement}
                      disabled={quantity >= product.stock}
                    >
                      <Plus size={16} />
                    </Button>
                  </InputGroup>
                </Col>
                <Col xs={12} md={7}>
                  <Button
                    variant="primary"
                    className="w-100 py-2"
                    onClick={handleAddWithQuantity}
                    disabled={isAddingToCart}
                  >
                    <ShoppingCart size={20} className="me-2" />
                    {isAddingToCart
                      ? "Agregando..."
                      : `Agregar al carrito (${quantity})`}
                  </Button>
                </Col>
              </Row>
            ) : (
              <Button
                variant="outline-secondary"
                className="w-100 py-2"
                disabled
              >
                <ShoppingCart size={20} className="me-2" />
                Sin stock
              </Button>
            )}
          </>
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
