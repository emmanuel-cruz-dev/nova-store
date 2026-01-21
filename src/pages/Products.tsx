import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { DollarSign, Search, X } from "lucide-react";
import {
  useQueryHandler,
  useProductsByCategory,
  useProductsPublicFilter,
} from "../hooks";
import { ProductsGallery, PaginationItem } from "../components";
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

  return (
    <Container fluid>
      <Row>
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

        <Col as="main" md={9} lg={10} className="mb-4">
          <header className="pt-4">
            <h1 className="display-6 fw-semibold custom__text-primary">
              {
                categories.find((category) => category.id === selectedCategory)
                  ?.name!
              }
            </h1>
          </header>

          <div className="bg-light p-3 rounded">
            <Row className="g-3 align-items-end">
              <Col md={5} lg={4}>
                <Form.Label className="mb-1 small fw-semibold" htmlFor="search">
                  Buscar producto
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <Search size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    id="search"
                    name="search"
                    type="text"
                    placeholder="Nombre, marca o descripción..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>

              <Col md={3} lg={2}>
                <Form.Label
                  className="mb-1 small fw-semibold"
                  htmlFor="minPrice"
                >
                  Precio mínimo
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <DollarSign size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    id="minPrice"
                    name="minPrice"
                    type="number"
                    placeholder="0"
                    min={0}
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </InputGroup>
              </Col>

              <Col md={3} lg={2}>
                <Form.Label
                  className="mb-1 small fw-semibold"
                  htmlFor="maxPrice"
                >
                  Precio máximo
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <DollarSign size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    id="maxPrice"
                    name="maxPrice"
                    type="number"
                    placeholder="∞"
                    min={0}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </InputGroup>
              </Col>

              {hasActiveFilters && (
                <Col md={12} lg="auto">
                  <Button
                    variant="outline-secondary custom__text-muted"
                    onClick={clearFilters}
                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                  >
                    <X size={16} />
                    Limpiar filtros
                  </Button>
                </Col>
              )}
            </Row>

            {!loading && (
              <p className="mt-3 text-center custom__text-muted mb-0">
                <small>
                  {filteredProducts.length === products.length ? (
                    <>Mostrando {products.length} productos</>
                  ) : (
                    <>
                      Mostrando {filteredProducts.length} de {products.length}{" "}
                      productos
                    </>
                  )}
                </small>
              </p>
            )}
          </div>

          {!loading && filteredProducts.length === 0 && hasActiveFilters ? (
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

              {filteredProducts.length > 6 && (
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
