import {
  Form,
  InputGroup,
  Row,
  Col,
  Button,
  Placeholder,
} from "react-bootstrap";
import { Search, X } from "lucide-react";
import { ActivityFilter, DateFilter, UsersFiltersProps } from "../../types";

function UsersFilters({
  searchTerm,
  activityFilter,
  dateFilter,
  hasActiveFilters,
  usersCount,
  filteredCount,
  loading,
  setSearchTerm,
  setActivityFilter,
  setDateFilter,
  clearFilters,
}: UsersFiltersProps) {
  return (
    <div className="bg-light py-3 rounded" style={{ marginTop: "-12px" }}>
      <Row className="g-3 align-items-end">
        <Col md={6} lg={3}>
          <Form.Label className="mb-1 small fw-semibold" htmlFor="search">
            Buscar usuario
          </Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <Search size={18} />
            </InputGroup.Text>
            <Form.Control
              id="search"
              type="text"
              placeholder="Nombre o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>

        <Col md={6} lg={3}>
          <Form.Label className="mb-1 small fw-semibold" htmlFor="activity">
            Actividad
          </Form.Label>
          <Form.Select
            id="activity"
            value={activityFilter}
            onChange={(e) =>
              setActivityFilter(e.target.value as ActivityFilter)
            }
          >
            <option value="all">Todos</option>
            <option value="active">Con órdenes</option>
            <option value="inactive">Sin órdenes</option>
          </Form.Select>
        </Col>

        <Col md={6} lg={3}>
          <Form.Label className="mb-1 small fw-semibold" htmlFor="date">
            Fecha de registro
          </Form.Label>
          <Form.Select
            id="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
          >
            <option value="all">Todas las fechas</option>
            <option value="last-week">Última semana</option>
            <option value="last-month">Último mes</option>
            <option value="last-3-months">Últimos 3 meses</option>
            <option value="older">Más antiguos</option>
          </Form.Select>
        </Col>

        {hasActiveFilters && (
          <Col xs={12} lg="auto">
            <Button
              variant="outline-secondary"
              onClick={clearFilters}
              className="w-100 d-flex align-items-center justify-content-center gap-2 custom__text-muted"
            >
              <X size={16} />
              Limpiar filtros
            </Button>
          </Col>
        )}
      </Row>

      {loading ? (
        <div className="d-flex justify-content-center mt-3">
          <Placeholder animation="wave">
            <Placeholder
              style={{ width: 142, height: 16 }}
              className="rounded"
            />
          </Placeholder>
        </div>
      ) : (
        <p className="mt-3 text-center text-muted mb-0">
          <small>
            {filteredCount === usersCount
              ? `Mostrando ${filteredCount} usuarios`
              : `Mostrando ${filteredCount} de ${usersCount} usuarios`}
          </small>
        </p>
      )}
    </div>
  );
}

export default UsersFilters;
