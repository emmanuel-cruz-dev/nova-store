import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { motion } from "motion/react";
import { ArrowLeft, Heart } from "lucide-react";
import { useAuthStore, useFavoritesStore } from "../../stores";
import {
  ProductDetailsCardSkeleton,
  HighlightedFeatures,
  ProductInfoCard,
  ProductNotFound,
  CustomTooltip,
} from "../index";
import { highlightedFeatures } from "../../data/highlightedFeatures";
import { ProductDetailsCardProps } from "../../types";

const ProductDetailsCard = ({
  product,
  isLoading = false,
}: ProductDetailsCardProps) => {
  const { isAuthenticated } = useAuthStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();

  if (isLoading) return <ProductDetailsCardSkeleton />;

  if (!product) return <ProductNotFound />;

  return (
    <Container className="py-5">
      <motion.header
        className="mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Link
          to="/products"
          className="text-decoration-none custom__text-muted d-flex align-items-center gap-2"
          style={{ width: "fit-content" }}
        >
          <motion.div
            animate={{ x: [0, -4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <ArrowLeft size={20} />
          </motion.div>
          Ir a la tienda
        </Link>
      </motion.header>

      <Row className="g-4">
        <Col lg={6}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card className="shadow-sm border-0 mb-3">
              <Card.Body>
                <div
                  className="relative rounded d-flex align-items-center justify-content-center m-0"
                  style={{
                    height: "320px",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #f6f8fa, #dcecfb)",
                  }}
                >
                  {isAuthenticated && (
                    <CustomTooltip
                      text={
                        isFavorite(product.id)
                          ? "Eliminar de favoritos"
                          : "Añadir a favoritos"
                      }
                    >
                      <Button
                        variant="light"
                        onClick={() => toggleFavorite(product)}
                        className="position-absolute top-0 end-0 m-4 d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: "42px",
                          height: "42px",
                          padding: "0",
                        }}
                        aria-label="Añadir a favoritos"
                      >
                        <Heart
                          fill={isFavorite(product.id) ? "black" : "none"}
                        />
                      </Button>
                    </CustomTooltip>
                  )}

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
                </div>
              </Card.Body>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <HighlightedFeatures features={highlightedFeatures} />
            </motion.div>
          </motion.div>
        </Col>

        <Col lg={6}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <ProductInfoCard product={product} />
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsCard;
