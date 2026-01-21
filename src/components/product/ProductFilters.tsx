import { Form, InputGroup, Row, Col, Button } from "react-bootstrap";
import { Search, DollarSign, X } from "lucide-react";
import { ProductStatus, StockLevel, ProductFiltersProps } from "../../types";

const ProductFilters = ({
  searchTerm,
  setSearchTerm,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  statusFilter,
  setStatusFilter,
  stockFilter,
  setStockFilter,
  hasActiveFilters,
  clearFilters,
}: ProductFiltersProps) => {
  return (
    <Row className="g-3 align-items-end">
      <Col md={6} lg={4}>
        <Form.Label className="mb-1 small fw-semibold">
          Buscar producto
        </Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <Search size={18} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Nombre o marca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Col>

      <Col md={6} lg={2}>
        <Form.Label className="mb-1 small fw-semibold">Precio mín.</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <DollarSign size={18} />
          </InputGroup.Text>
          <Form.Control
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </InputGroup>
      </Col>

      <Col md={6} lg={2}>
        <Form.Label className="mb-1 small fw-semibold" htmlFor="maxPrice">
          Precio máx.
        </Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <DollarSign size={18} />
          </InputGroup.Text>
          <Form.Control
            id="maxPrice"
            type="number"
            placeholder="∞"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </InputGroup>
      </Col>

      <Col md={6} lg={2}>
        <Form.Label className="mb-1 small fw-semibold" htmlFor="status">
          Estado
        </Form.Label>
        <Form.Select
          id="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ProductStatus)}
        >
          <option value="all">Todos</option>
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
        </Form.Select>
      </Col>

      <Col md={6} lg={2}>
        <Form.Label className="mb-1 small fw-semibold" htmlFor="stock">
          Nivel de stock
        </Form.Label>
        <Form.Select
          id="stock"
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as StockLevel)}
        >
          <option value="all">Todos</option>
          <option value="critical">Crítico (0)</option>
          <option value="low">Bajo (≤5)</option>
          <option value="ok">OK (6-20)</option>
          <option value="high">Alto (&gt;20)</option>
        </Form.Select>
      </Col>

      {hasActiveFilters && (
        <Col xs={12} lg="auto">
          <Button
            variant="outline-secondary"
            onClick={clearFilters}
            className="w-100 d-flex align-items-center justify-content-center gap-2"
          >
            <X size={16} /> Limpiar filtros
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default ProductFilters;
