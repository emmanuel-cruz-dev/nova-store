import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { DollarSign, Search, X } from "lucide-react";
import { PublicProductFiltersProps } from "../../types";

function PublicProductFilters({
  searchTerm,
  minPrice,
  maxPrice,
  hasActiveFilters,
  productsCount,
  filteredCount,
  loading,
  setSearchTerm,
  setMinPrice,
  setMaxPrice,
  clearFilters,
}: PublicProductFiltersProps) {
  return (
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
          <Form.Label className="mb-1 small fw-semibold" htmlFor="minPrice">
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
          <Form.Label className="mb-1 small fw-semibold" htmlFor="maxPrice">
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
            {filteredCount === productsCount
              ? `Mostrando ${productsCount} productos`
              : `Mostrando ${filteredCount} de ${productsCount} productos`}
          </small>
        </p>
      )}
    </div>
  );
}

export default PublicProductFilters;
