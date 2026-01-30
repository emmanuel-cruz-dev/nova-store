import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import {
  useQueryHandler,
  useProductsByCategory,
  useProductsPublicFilter,
} from "../hooks";
import {
  ProductsGallery,
  PaginationItem,
  PublicProductFilters,
} from "../components";
import { categories } from "../data/categories";

function Products() {
  const { selectedCategory, handleCategoryClick } = useQueryHandler();
  const { products, loading, error } = useProductsByCategory(selectedCategory);
  const {
    filteredProducts,
    paginatedProducts,
    currentPage,
    totalPages,
    searchTerm,
    minPrice,
    maxPrice,
    hasActiveFilters,
    setSearchTerm,
    setMinPrice,
    setMaxPrice,
    clearFilters,
    handlePageChange,
  } = useProductsPublicFilter(products, 6);

  const handleCategoryChange = (category: string) => {
    handleCategoryClick(category);
    clearFilters();
  };

  const isEmptyStore = !loading && products.length === 0;
  const showNoResults =
    !loading && filteredProducts.length === 0 && hasActiveFilters;
  const showPagination = filteredProducts.length;

  return (
    <Container fluid style={{ maxWidth: "1280px" }}>
      <Row>
        {!isEmptyStore && (
          <Col
            md={3}
            lg={2}
            className="mb-md-0 py-4"
            style={{ background: "#eee" }}
          >
            <nav
              className="sticky-top"
              style={{ top: "68px", zIndex: 1 }}
              aria-label="Category navigation"
            >
              <h5
                className="mb-3 custom__text-primary"
                style={{ fontSize: "1.5rem" }}
              >
                Categorías
              </h5>
              <ListGroup as="ul" className="list-unstyled">
                {categories.map((category) => (
                  <ListGroup.Item
                    as="li"
                    key={category.id}
                    action
                    active={selectedCategory === category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className="border-0 rounded mb-2 custom__text-muted"
                    style={{ cursor: "pointer" }}
                  >
                    {category.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </nav>
          </Col>
        )}

        <Col
          as="main"
          md={isEmptyStore ? 12 : 9}
          lg={isEmptyStore ? 12 : 10}
          className="mb-4"
        >
          <header className="pt-4">
            <h1 className="display-6 fw-semibold custom__text-primary">
              {categories.find((category) => category.id === selectedCategory)
                ?.name || "Productos"}
            </h1>
          </header>

          {!isEmptyStore && (
            <PublicProductFilters
              searchTerm={searchTerm}
              minPrice={minPrice}
              maxPrice={maxPrice}
              hasActiveFilters={hasActiveFilters}
              productsCount={products.length}
              filteredCount={filteredProducts.length}
              loading={loading}
              setSearchTerm={setSearchTerm}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              clearFilters={clearFilters}
            />
          )}

          {isEmptyStore ? (
            <section className="text-center py-5">
              <h4 className="custom__text-muted mb-3">
                No hay productos disponibles por el momento
              </h4>
              <p className="custom__text-muted">
                Estamos trabajando para ofrecerte novedades muy pronto.
              </p>
              <Link to="/">
                <Button variant="outline-primary px-4">Volver al inicio</Button>
              </Link>
            </section>
          ) : showNoResults ? (
            <section className="text-center py-5">
              <h5 className="custom__text-muted">
                No se encontraron productos
              </h5>
              <p className="custom__text-muted">
                Intenta ajustar los filtros o{" "}
                <Button
                  variant="link"
                  className="p-0 text-decoration-none align-baseline custom__text-primary"
                  onClick={clearFilters}
                >
                  limpiar todos los filtros
                </Button>
              </p>
            </section>
          ) : (
            <>
              <ProductsGallery
                products={paginatedProducts}
                loading={loading}
                error={error}
              />

              {showPagination && (
                <PaginationItem
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={loading}
                />
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
