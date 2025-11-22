import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ProductCard, ErrorMessage } from "../index";
import { handleRetry } from "../../utils/utils";

function ProductsGallery({ title, products, loading, error }) {
  return (
    <Container>
      <header>
        <h1 className="display-6 text-center fw-bold my-4">{title}</h1>
      </header>
      <Row className="g-3 align-items-center justify-content-center">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Col key={`placeholder-${index}`} xs={12} md={6} lg={4} xl={4}>
              <ProductCard isLoading={true} />
            </Col>
          ))
        ) : error ? (
          <ErrorMessage
            error={error}
            entity="Productos"
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
