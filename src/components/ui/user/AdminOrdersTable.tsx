import { Spinner, Badge, Card, Form, Accordion } from "react-bootstrap";
import { Bounce, ToastContainer } from "react-toastify";
import { Calendar, User, Mail, Clipboard } from "lucide-react";
import { useAdminOrders } from "../../../hooks/useAdminOrders";
import {
  EmptySection,
  ErrorMessage,
  OrderItemsList,
  OrderTableSummary,
  OrdersLoader,
  SectionHeader,
} from "../../../components";
import { getStatusBadge } from "../../../helpers/GetStatusBadge";
import { formatDateDetailed, formatPrice } from "../../../utils";
import { Order } from "../../../types";

function AdminOrdersTable() {
  const { orders, isLoading, error, handleUpdateStatus, updatingOrderId } =
    useAdminOrders();

  if (isLoading) return <OrdersLoader />;

  if (error) return <ErrorMessage message="Error al cargar las órdenes" />;

  const handleStatusChange = (
    userId: number,
    orderId: string,
    newStatus: Order["status"]
  ) => {
    handleUpdateStatus(userId, orderId, newStatus);
  };

  return (
    <section>
      <div className="d-flex justify-content-between">
        <SectionHeader
          title="Gestión de órdenes"
          subtitle="Administra las órdenes del sistema"
        />

        <span className="mt-3">
          {orders.length === 0 ? (
            <Badge bg="secondary">No hay órdenes registradas</Badge>
          ) : (
            <Badge bg="secondary">{orders.length} órdenes</Badge>
          )}
        </span>
      </div>

      {orders.length === 0 ? (
        <EmptySection
          title="No hay órdenes registradas"
          message="Las órdenes de los clientes aparecerán aquí."
          icon={<Clipboard size={56} className="text-white" />}
        />
      ) : (
        <Accordion
          alwaysOpen={false}
          className="d-flex flex-column gap-3"
          style={{ marginTop: "-14px" }}
        >
          {orders.map((order, index) => (
            <Accordion.Item
              eventKey={String(index)}
              key={order.id}
              className="shadow-sm border-0"
              style={{ borderRadius: "0.5rem", overflow: "hidden" }}
            >
              <Card className="border-0">
                <Accordion.Header>
                  <div className="w-100 d-md-flex justify-content-between align-items-start">
                    <div className="mb-3 mb-md-0">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <strong>Orden #{order.id.slice(0, 6)}</strong>
                        {getStatusBadge(order.status)}
                      </div>

                      <ul className="d-flex flex-wrap gap-3 custom__text-muted small p-0">
                        <li className="d-flex align-items-center gap-1">
                          <Calendar size={14} />
                          {formatDateDetailed(order.createdAt)}
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <User size={14} />
                          {order.userName}
                        </li>
                        <li className="d-flex align-items-center gap-1">
                          <Mail size={14} />
                          {order.userEmail}
                        </li>
                      </ul>
                    </div>

                    <div className="d-flex flex-md-column justify-content-between gap-2 text-end me-md-3">
                      <div className="fw-bold fs-5 custom__text-primary">
                        ${formatPrice(order.total)}
                      </div>

                      {updatingOrderId === order.id ? (
                        <div className="d-flex align-items-center gap-2 mt-1 custom__text-muted small">
                          <Spinner animation="border" size="sm" />
                          Actualizando estado...
                        </div>
                      ) : (
                        <>
                          <Form.Label
                            htmlFor={`status-${order.id}`}
                            className="visually-hidden"
                          >
                            Cambiar estado de la orden {order.id.slice(0, 6)}
                          </Form.Label>
                          <Form.Select
                            id={`status-${order.id}`}
                            name={`status-${order.id}`}
                            size="sm"
                            value={order.status}
                            disabled={updatingOrderId === order.id}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              handleStatusChange(
                                order.userId,
                                order.id,
                                e.target.value as Order["status"]
                              )
                            }
                            style={{ width: "150px" }}
                          >
                            <option value="pending">Pendiente</option>
                            <option value="processing">Procesando</option>
                            <option value="completed">Completada</option>
                            <option value="cancelled">Cancelada</option>
                          </Form.Select>
                        </>
                      )}
                    </div>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  <h6 className="custom__text-muted mb-3">
                    Productos ({order.items.length})
                  </h6>

                  <OrderItemsList items={order.items} />

                  <OrderTableSummary
                    subtotal={order.subtotal}
                    shipping={order.shipping}
                  />
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          ))}
        </Accordion>
      )}

      <ToastContainer
        position="bottom-left"
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </section>
  );
}

export default AdminOrdersTable;
