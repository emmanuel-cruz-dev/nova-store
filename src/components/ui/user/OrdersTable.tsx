import { Card, Spinner, Alert, Accordion } from "react-bootstrap";
import { Calendar } from "lucide-react";
import { useOrders } from "../../../hooks/useOrders";
import {
  EmptyOrders,
  ErrorMessage,
  OrderItemsList,
  OrderTableSummary,
  OrdersLoader,
} from "../../../components";
import { getStatusBadge } from "../../../helpers/GetStatusBadge";
import { formatDateDetailed, formatPrice } from "../../../utils/utils";

function OrdersTable() {
  const { orders, isLoading, error } = useOrders();

  if (isLoading) return <OrdersLoader />;

  if (error) return <ErrorMessage message="Error al cargar las órdenes" />;

  if (orders.length === 0)
    return (
      <EmptyOrders
        title="No tienes órdenes aún"
        message="Cuando realices una compra, aparecerá aquí."
      />
    );

  return (
    <section>
      <h2 className="mb-4">Mis Órdenes</h2>

      <Accordion alwaysOpen={false} className="d-flex flex-column gap-3">
        {orders.map((order, index) => (
          <Accordion.Item eventKey={String(index)} key={order.id}>
            <Card className="shadow-sm border-0">
              <Accordion.Header>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <div>
                    <div className="d-flex align-items-center gap-2">
                      <strong>Orden #{order.id.slice(0, 6)}</strong>
                      {getStatusBadge(order.status)}
                    </div>

                    <small className="text-muted d-flex align-items-center gap-1 mt-1">
                      <Calendar size={14} />
                      {formatDateDetailed(order.createdAt)}
                    </small>
                  </div>

                  <div className="fw-bold fs-5 text-primary d-flex align-items-center gap-1 me-md-3">
                    ${formatPrice(order.total)}
                  </div>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <h6 className="text-muted mb-3">
                  Productos ({order.items.length})
                </h6>

                <OrderItemsList items={order.items} />

                <OrderTableSummary
                  subtotal={order.subtotal}
                  shipping={order.shipping}
                  total={order.total}
                />
              </Accordion.Body>
            </Card>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
}

export default OrdersTable;
