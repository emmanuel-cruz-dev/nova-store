import { Card, Accordion, Spinner, Button } from "react-bootstrap";
import { Calendar, Trash2 } from "lucide-react";
import { Bounce, ToastContainer } from "react-toastify";
import { useOrdersTable } from "../../../hooks";
import {
  EmptyOrders,
  ErrorMessage,
  OrderItemsList,
  OrderTableSummary,
  OrdersLoader,
} from "../../../components";
import { getStatusBadge } from "../../../helpers/GetStatusBadge";
import { formatDateDetailed, formatPrice } from "../../../utils/utils";

function OrdersTable({ userId }: { userId: number }) {
  const {
    orders,
    isLoading,
    error,
    deletingOrder,
    handleDeleteOrder,
    isOrderDeleting,
  } = useOrdersTable(userId);

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
        {orders.map((order, index) => {
          const isDeleting = isOrderDeleting(order.id);

          return (
            <Accordion.Item
              eventKey={String(index)}
              key={order.id}
              className="shadow-sm border-0"
              style={{ borderRadius: "0.5rem", overflow: "hidden" }}
            >
              <Card className="shadow-sm border-0">
                <Accordion.Header>
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <div>
                      <div className="d-flex align-items-center gap-2">
                        <strong>Orden #{order.id.slice(0, 6)}</strong>
                        {getStatusBadge(order.status)}
                      </div>

                      <small className="text-muted d-flex align-items-center gap-1 mt-2">
                        <Calendar size={14} />
                        {formatDateDetailed(order.createdAt)}
                      </small>

                      <div className="mt-2">
                        <Button
                          as="div"
                          onClick={(e) => handleDeleteOrder(order, e)}
                          className="btn btn-primary btn-sm"
                          style={{ fontSize: ".85rem" }}
                          disabled={deletingOrder}
                        >
                          {isDeleting ? (
                            <>
                              <Spinner className="me-2" size="sm" />
                              Eliminando...
                            </>
                          ) : (
                            <>
                              <Trash2 size={16} className="me-2 mb-1" />
                              Eliminar
                            </>
                          )}
                        </Button>
                      </div>
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
          );
        })}
      </Accordion>
      <ToastContainer
        position="bottom-left"
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </section>
  );
}

export default OrdersTable;
