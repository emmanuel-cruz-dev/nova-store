import { Container, Row, Col } from "react-bootstrap";
import { ProductCard, ErrorMessage, ProductsResultsLoader } from "../index";
import { handleRetry } from "../../utils";
import { ProductsGalleryProps } from "../../types";

function ProductsGallery({ products, loading, error }: ProductsGalleryProps) {
  return (
    <Container>
      <Row className="g-3 align-items-center justify-content-center">
        {loading ? (
          <>
            <ProductsResultsLoader />
            {Array.from({ length: 6 }).map((_, index) => (
              <Col key={`placeholder-${index}`} xs={12} md={6} lg={4} xl={4}>
                <ProductCard isLoading={true} />
              </Col>
            ))}
          </>
        ) : error ? (
          <ErrorMessage
            message="Error al cargar productos"
            onRetry={handleRetry}
          />
        ) : (
          products.map((product) => (
            <Col key={product.id} xs={12} md={6} lg={4} xl={4}>
              <ProductCard
                id={product.id}
                name={product.name}
                brand={product.brand}
                price={product.price}
                description={product.description}
                category={product.category}
                image={product.image}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default ProductsGallery;
