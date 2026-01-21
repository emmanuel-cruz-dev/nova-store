import { Row, Col, Button, Card } from "react-bootstrap";
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
  DashboardError,
} from "..";
import { formatCurrency } from "../../utils";

function Dashboard() {
  const { stats, isLoading, error, refresh } = useDashboard();

  if (error) {
    return <DashboardError />;
  }

  if (!stats) {
    return null;
  }

  const orderSummaryItems = [
    {
      label: "Pendientes",
      value: stats.orders.pendingOrders,
      variant: "warning",
    },
    {
      label: "En Proceso",
      value: stats.orders.processingOrders,
      variant: "info",
    },
    {
      label: "Completadas",
      value: stats.orders.completedOrders,
      variant: "success",
    },
    {
      label: "Canceladas",
      value: stats.orders.cancelledOrders,
      variant: "danger",
    },
  ];

  return (
    <section>
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ marginBottom: "-36px" }}
      >
        <SectionHeader
          title="Panel de control"
          subtitle="Resumen de actividad, estadísticas y rendimiento"
        />
        <Button
          variant="primary"
          className="mb-5 px-4 d-flex align-items-center gap-2"
          onClick={() => refresh()}
        >
          <RefreshCw size={16} />
          Actualizar
        </Button>
      </div>

      {isLoading ? (
        <DashboardSkeleton />
      ) : (
        <>
          <Row className="g-4 mb-4">
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
                variant={stats.users.totalUsers <= 5 ? "danger" : "info"}
              />
            </Col>

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
                variant={
                  stats.products.lowStockProducts >= 5 ? "danger" : "info"
                }
              />
            </Col>
          </Row>

          <Row className="g-4 mb-4">
            <Col xs={12} lg={6}>
              <OrderStatusChart orderStats={stats.orders} />
            </Col>
            <Col xs={12} lg={6}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title as="h5" className="mb-4">
                    Resumen de Órdenes
                  </Card.Title>
                  <Row className="g-3">
                    {orderSummaryItems.map((item) => (
                      <Col key={item.label} xs={6}>
                        <div
                          className={`p-3 bg-${item.variant} bg-opacity-10 rounded`}
                        >
                          <small className="custom__text-muted d-block mb-1">
                            {item.label}
                          </small>
                          <div className={`fs-4 fw-bold text-${item.variant}`}>
                            {item.value}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

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
