import { Card, Col, Row } from "react-bootstrap";
import { statusColors, statusLabels } from "../../data/orderStatus";
import { OrderStats } from "../../types";

function OrderStatusChart({ orderStats }: { orderStats: OrderStats }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Card.Title as="h5" className="mb-4">
          Distribución de Órdenes
        </Card.Title>

        <section
          className="d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "200px" }}
        >
          <div
            style={{ position: "relative", width: "200px", height: "200px" }}
          >
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              role="img"
              aria-label="Gráfico de distribución de órdenes"
            >
              {orderStats.ordersByStatus.map((item, index) => {
                let startAngle = 0;

                for (let i = 0; i < index; i++) {
                  startAngle +=
                    (orderStats.ordersByStatus[i].percentage / 100) * 360;
                }

                const angle = (item.percentage / 100) * 360;
                const endAngle = startAngle + angle;

                const startRad = (startAngle - 90) * (Math.PI / 180);
                const endRad = (endAngle - 90) * (Math.PI / 180);

                const x1 = 100 + 80 * Math.cos(startRad);
                const y1 = 100 + 80 * Math.sin(startRad);
                const x2 = 100 + 80 * Math.cos(endRad);
                const y2 = 100 + 80 * Math.sin(endRad);

                const largeArc = angle > 180 ? 1 : 0;

                const pathData = [
                  `M 100 100`,
                  `L ${x1} ${y1}`,
                  `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
                  `Z`,
                ].join(" ");

                return (
                  <path
                    key={item.status}
                    d={pathData}
                    fill={
                      statusColors[item.status as keyof typeof statusColors]
                    }
                    opacity="0.9"
                  />
                );
              })}
              <circle cx="100" cy="100" r="50" fill="white" />
            </svg>
            <div className="position-absolute top-50 start-50 translate-middle text-center">
              <div className="fw-bold fs-4">{orderStats.totalOrders}</div>
              <small className="text-muted">Total</small>
            </div>
          </div>
        </section>

        <Row className="g-2 list-unstyled" as="ul">
          {orderStats.ordersByStatus.map((item) => (
            <Col key={item.status} xs={6} as="li">
              <div className="d-flex align-items-center gap-2">
                <span
                  className="d-inline-block rounded-1"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor:
                      statusColors[item.status as keyof typeof statusColors],
                  }}
                  aria-hidden="true"
                />
                <div className="flex-grow-1">
                  <small className="text-muted d-block">
                    {statusLabels[item.status as keyof typeof statusLabels]}
                  </small>
                  <span className="fw-semibold">
                    {item.count} ({item.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default OrderStatusChart;
