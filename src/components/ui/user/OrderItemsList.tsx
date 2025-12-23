import { formatPrice } from "../../../utils/utils";
import { OrderItem } from "../../../types";

function OrderItemsList({ items }: { items: Omit<OrderItem, "productId">[] }) {
  return (
    <article className="d-flex flex-column gap-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="d-flex align-items-center gap-3 p-2 bg-light rounded"
        >
          <img
            src={item.productImage}
            alt={item.productTitle}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />

          <div className="flex-grow-1">
            <p className="mb-0 fw-medium">{item.productTitle}</p>
            <small className="text-muted">
              Cantidad: {item.quantity} × ${formatPrice(item.price)}
            </small>
          </div>

          <div className="text-end fw-bold">
            ${formatPrice(item.price * item.quantity)}
          </div>
        </div>
      ))}
    </article>
  );
}

export default OrderItemsList;
