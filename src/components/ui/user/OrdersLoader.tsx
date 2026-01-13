import { Spinner } from "react-bootstrap";

function OrdersLoader() {
  return (
    <article className="text-center py-5">
      <Spinner animation="border" />
      <p className="mt-3 custom__text-muted">Cargando órdenes...</p>
    </article>
  );
}

export default OrdersLoader;
