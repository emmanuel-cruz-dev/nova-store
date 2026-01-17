import { Container, Row, Col, Alert } from "react-bootstrap";
import {
  DollarSign,
  Package,
  Users,
  RefreshCw,
  ClipboardCheck,
  ClipboardList,
  Boxes,
} from "lucide-react";
import { useDashboard } from "../../hooks";
import {
  StatCard,
  OrderStatusChart,
  TopProductsTable,
  DashboardSkeleton,
  SectionHeader,
} from "..";
import { formatCurrency } from "../../utils";

function Dashboard() {
  const { stats, isLoading, error, refresh } = useDashboard();

  if (error) {
    return (
      <Container fluid className="py-4">
        <Alert variant="danger">
          <Alert.Heading>Error al cargar el dashboard</Alert.Heading>
          <p>
            No se pudieron cargar las estadísticas. Por favor, intenta
            nuevamente.
          </p>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => refresh()}
          >
            <RefreshCw size={16} className="me-1" />
            Reintentar
          </button>
        </Alert>
      </Container>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <section>
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: "-36px" }}
      >
        <SectionHeader
          title="Panel de control"
          subtitle="Resumen de actividad, estadísticas y rendimiento"
        />
        <button
          className="btn btn-primary mb-5 px-4 d-flex align-items-center gap-2"
          onClick={() => refresh()}
        >
          <RefreshCw size={16} />
          Actualizar
        </button>
      </div>

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <Row className="g-4 mb-4">
            {/* Stats Cards */}
            <Col xs={12} sm={6} lg={4} xl={3}>
              <StatCard
                title="Ingresos Totales"
                value={formatCurrency(stats.sales.totalRevenue)}
                icon={DollarSign}
                variant="success"
              />
            </Col>
            <Col xs={12} sm={6} lg={4} xl={3}>
              <StatCard
                title="Total Productos"
                value={stats.products.totalProducts}
                icon={Boxes}
                variant="primary"
              />
            </Col>
            <Col xs={12} sm={6} lg={4} xl={3}>
              <StatCard
                title="Total Órdenes"
                value={stats.orders.totalOrders}
                icon={ClipboardList}
                variant="info"
              />
            </Col>
            <Col xs={12} sm={6} lg={4} xl={3}>
              <StatCard
                title="Total Usuarios"
                value={stats.users.totalUsers}
                icon={Users}
                variant="warning"
              />
            </Col>

            {/* Secondary Stats */}
            <Col xs={12} sm={6} lg={4} xl={3}>
              <StatCard
                title="Valor Promedio Orden"
                value={formatCurrency(stats.sales.averageOrderValue)}
                icon={DollarSign}
                variant="success"
              />
            </Col>
            <Col xs={12} sm={6} lg={4} xl={3}>
              <StatCard
                title="Productos Activos"
                value={stats.products.activeProducts}
                icon={Boxes}
                variant="primary"
              />
            </Col>
            <Col xs={12} sm={6} lg={4} xl={3}>
              <StatCard
                title="Órdenes Completadas"
                value={stats.orders.completedOrders}
                icon={ClipboardCheck}
                variant="success"
              />
            </Col>
            <Col xs={12} sm={6} lg={4} xl={3}>
              <StatCard
                title="Stock Bajo"
                value={stats.products.lowStockProducts}
                icon={Package}
                variant="danger"
              />
            </Col>
          </Row>

          {/* Charts */}
          <Row className="g-4 mb-4">
            <Col xs={12} lg={6}>
              <OrderStatusChart orderStats={stats.orders} />
            </Col>
            <Col xs={12} lg={6}>
              <div className="h-100">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title mb-4">Resumen de Órdenes</h5>
                    <div className="row g-3">
                      <div className="col-6">
                        <div className="p-3 bg-warning bg-opacity-10 rounded">
                          <div className="text-muted small mb-1">
                            Pendientes
                          </div>
                          <div className="fs-4 fw-bold text-warning">
                            {stats.orders.pendingOrders}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 bg-info bg-opacity-10 rounded">
                          <div className="text-muted small mb-1">
                            En Proceso
                          </div>
                          <div className="fs-4 fw-bold text-info">
                            {stats.orders.processingOrders}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 bg-success bg-opacity-10 rounded">
                          <div className="text-muted small mb-1">
                            Completadas
                          </div>
                          <div className="fs-4 fw-bold text-success">
                            {stats.orders.completedOrders}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3 bg-danger bg-opacity-10 rounded">
                          <div className="text-muted small mb-1">
                            Canceladas
                          </div>
                          <div className="fs-4 fw-bold text-danger">
                            {stats.orders.cancelledOrders}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Top Products */}
          <Row>
            <Col xs={12}>
              <TopProductsTable products={stats.products.topProducts || []} />
            </Col>
          </Row>
        </>
      )}
    </section>
  );
}

export default Dashboard;
