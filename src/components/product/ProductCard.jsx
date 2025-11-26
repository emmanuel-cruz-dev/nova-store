import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useAuth, useProductCard } from "../../hooks";
import { formatPrice, priceInstallments } from "../../utils/utils";

function ProductCard(props) {
  const { isAuthenticated } = useAuth();
  const {
    id = 0,
    name = "",
    brand = "",
    price = 0,
    category = "",
    description = "",
    image = "",
  } = props;
  const { handleAddToCartClick } = useProductCard({
    id,
    name,
    brand,
    price,
    category,
    description,
    image,
  });

  if (props.isLoading) return <ProductCardSkeleton />;

  return (
    <Card>
      <Link
        to={`/product/${id}`}
        className="text-decoration-none card__img-link"
        style={{
          background: "linear-gradient(135deg, #f6f8fa, #dcecfb)",
        }}
        title="Ver más información"
      >
        <Card.Img
          className="p-2 card__img"
          variant="top"
          src={image}
          alt={name}
          loading="lazy"
          style={{
            height: "15rem",
            objectFit: "contain",
            filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))",
          }}
        />
      </Link>
      <Card.Body>
        <Link
          to={`/product/${id}`}
          className="text-decoration-none"
          title="Ver más información"
        >
          <Card.Title className="line-clamp-1 mb-0">{name}</Card.Title>
          <Card.Text className="text-secondary my-0">{brand}</Card.Text>
          <Card.Text
            className="mb-1"
            style={{ color: "blue", fontSize: "1.2rem", fontWeight: "500" }}
          >
            ${formatPrice(price)}
          </Card.Text>
          <Card.Text className="text-primary my-0">
            6 cuotas de ${priceInstallments(price)}
          </Card.Text>
          <Card.Text className="line-clamp-2 text-secondary">
            {description}
          </Card.Text>
        </Link>
        {isAuthenticated ? (
          <Button
            variant="primary"
            className="mt-3 d-inline-flex justify-content-center gap-2 px-4 w-100"
            onClick={() => handleAddToCartClick(1)}
          >
            Añadir al carrito
          </Button>
        ) : (
          <Link to="/login">
            <Button
              variant="primary"
              className="mt-2 d-inline-flex justify-content-center gap-2 px-4 w-100"
            >
              Inicia sesión para comprar
            </Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
