import { Link } from "react-router-dom";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "motion/react";
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
    setCurrentPage,
    clearFilters,
    handlePageChange,
  } = useProductsPublicFilter(products, 6);

  const handleCategoryChange = (category: string) => {
    handleCategoryClick(category);
    clearFilters();
    setCurrentPage(1);
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
            <motion.nav
              className="sticky-top"
              style={{ top: "68px", zIndex: 1 }}
              aria-label="Category navigation"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <motion.h5
                className="mb-3 custom__text-primary"
                style={{ fontSize: "1.5rem" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                Categorías
              </motion.h5>

              <ListGroup as="ul" className="list-unstyled">
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 * index,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <ListGroup.Item
                      as="li"
                      action
                      active={selectedCategory === category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className="border-0 rounded mb-2 custom__text-muted"
                      style={{ cursor: "pointer" }}
                    >
                      {category.name}
                    </ListGroup.Item>
                  </motion.div>
                ))}
              </ListGroup>
            </motion.nav>
          </Col>
        )}

        <Col
          as="main"
          md={isEmptyStore ? 12 : 9}
          lg={isEmptyStore ? 12 : 10}
          className="mb-4"
        >
          <motion.header
            className="pt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="display-6 fw-semibold custom__text-primary">
              {categories.find((category) => category.id === selectedCategory)
                ?.name || "Productos"}
            </h1>
          </motion.header>

          {!isEmptyStore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
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
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {isEmptyStore ? (
              <motion.section
                key="empty-store"
                className="text-center py-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <h4 className="custom__text-muted mb-3">
                  No hay productos disponibles por el momento
                </h4>
                <p className="custom__text-muted">
                  Estamos trabajando para ofrecerte novedades muy pronto.
                </p>
                <Link to="/">
                  <Button variant="outline-primary px-4">
                    Volver al inicio
                  </Button>
                </Link>
              </motion.section>
            ) : showNoResults ? (
              <motion.section
                key="no-results"
                className="text-center py-5"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
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
              </motion.section>
            ) : (
              <motion.div
                key="products-content"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <ProductsGallery
                  products={paginatedProducts}
                  loading={loading}
                  error={error}
                />

                {showPagination && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <PaginationItem
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      isLoading={loading}
                    />
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
