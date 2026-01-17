import { Card } from "react-bootstrap";
import { OrderStats } from "../../types";

function OrderStatusChart({ orderStats }: { orderStats: OrderStats }) {
  const statusColors = {
    pending: "#ffc107",
    processing: "#0dcaf0",
    completed: "#198754",
    cancelled: "#dc3545",
  };

  const statusLabels = {
    pending: "Pendiente",
    processing: "En Proceso",
    completed: "Completada",
    cancelled: "Cancelada",
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <h5 className="card-title mb-4">Distribución de Órdenes</h5>

        <div
          className="d-flex justify-content-center align-items-center mb-4"
          style={{ minHeight: "200px" }}
        >
          <div
            style={{ position: "relative", width: "200px", height: "200px" }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200">
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
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <div className="fw-bold fs-4">{orderStats.totalOrders}</div>
              <div className="text-muted small">Total</div>
            </div>
          </div>
        </div>

        <div className="row g-2">
          {orderStats.ordersByStatus.map((item) => (
            <div key={item.status} className="col-6">
              <div className="d-flex align-items-center">
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "2px",
                    backgroundColor:
                      statusColors[item.status as keyof typeof statusColors],
                    marginRight: "8px",
                  }}
                />
                <div className="flex-grow-1">
                  <div className="small text-muted">
                    {statusLabels[item.status as keyof typeof statusLabels]}
                  </div>
                  <div className="fw-semibold">
                    {item.count} ({item.percentage.toFixed(1)}%)
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default OrderStatusChart;
