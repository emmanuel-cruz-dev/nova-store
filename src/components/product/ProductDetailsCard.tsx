import { Link } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import {
  ProductDetailsCardSkeleton,
  HighlightedFeatures,
  ProductInfoCard,
} from "../index";
import { highlightedFeatures } from "../../data/highlightedFeatures";
import { ProductDetailsCardProps } from "../../types";

const ProductDetailsCard = ({
  product,
  isLoading = false,
}: ProductDetailsCardProps) => {
  if (isLoading) return <ProductDetailsCardSkeleton />;

  if (!product) {
    return (
      <Container className="pt-5 pb-3">
        <header className="mb-4">
          <Link
            to="/products"
            className="text-decoration-none text-muted d-flex align-items-center gap-2"
          >
            <ArrowLeft size={20} />
            Volver a la tienda
          </Link>
        </header>
        <Card className="shadow-sm border-0">
          <Card.Body className="text-center py-5">
            <h3 className="text-muted">Producto no encontrado</h3>
            <p className="text-muted">
              El producto que buscas no está disponible.
            </p>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <header className="mb-4">
        <Link
          to="/products"
          className="text-decoration-none text-muted d-flex align-items-center gap-2"
        >
          <ArrowLeft size={20} />
          Volver a la tienda
        </Link>
      </header>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="shadow-sm border-0 mb-3">
            <Card.Body>
              <figure
                className="rounded d-flex align-items-center justify-content-center m-0"
                style={{
                  height: "320px",
                  overflow: "hidden",
                  background: "linear-gradient(135deg, #f6f8fa, #dcecfb)",
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded"
                  loading="lazy"
                  style={{
                    height: "100%",
                    objectFit: "contain",
                    padding: "1.75rem 1rem",
                    filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))",
                  }}
                />
              </figure>
            </Card.Body>
          </Card>

          <HighlightedFeatures features={highlightedFeatures} />
        </Col>

        <Col lg={6}>
          <ProductInfoCard product={product} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsCard;
