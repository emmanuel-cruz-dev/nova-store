import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Heart, ShoppingCart, LogIn } from "lucide-react";
import { useAuthStore, useFavoritesStore } from "../../stores";
import { useProductCard } from "../../hooks";
import { ProductCardSkeleton, CustomTooltip } from "../index";
import { Product, ProductCardProps } from "../../types";
import { formatPrice, priceInstallments } from "../../utils";

function ProductCard(props: ProductCardProps) {
  const { isAuthenticated } = useAuthStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(props.id!);
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

  const handleAddToFavorites = (e: MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(props as Product);
  };

  return (
    <Card className="overflow-hidden custom__product-card">
      {isAuthenticated && (
        <CustomTooltip
          text={favorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
        >
          <Button
            variant="light"
            onClick={handleAddToFavorites}
            className="favorite-btn-float position-absolute top-1 end-0 m-2 d-flex align-items-center justify-content-center rounded-circle"
            style={{ width: "42px", height: "42px", zIndex: 1, padding: 0 }}
            aria-label="Añadir a favoritos"
          >
            <Heart
              size={20}
              fill={favorite ? "black" : "none"}
              color={favorite ? "black" : "black"}
            />
          </Button>
        </CustomTooltip>
      )}

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
          <Card.Text className="custom__text-muted my-0 mb-1">
            {brand}
          </Card.Text>
          <Card.Title className="line-clamp-1 mb-1 custom__text-primary">
            {name}
          </Card.Title>
          <Card.Text className="custom__text-primary my-0 mb-2">
            6 cuotas de ${priceInstallments(price)}
          </Card.Text>
          <Card.Text className="line-clamp-2 custom__text-muted">
            {description}
          </Card.Text>
        </Link>
        <Row className="align-items-center mt-3">
          <Col>
            <Card.Text
              style={{ color: "blue", fontSize: "1.4rem", fontWeight: "600" }}
            >
              ${formatPrice(price)}
            </Card.Text>
          </Col>
          <Col>
            {isAuthenticated ? (
              <Button
                variant="primary"
                className="d-inline-flex justify-content-center align-items-center gap-2 w-100"
                onClick={() => handleAddToCartClick(1)}
              >
                <ShoppingCart size={20} />
                Agregar
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  variant="primary"
                  className="d-inline-flex justify-content-center align-items-center gap-2 w-100"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <LogIn size={20} />
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
