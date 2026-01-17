import { formatPrice } from "../../utils";

function OrderTableSummary({
  subtotal,
  shipping,
  total,
}: {
  subtotal: number;
  shipping: number;
  total?: number;
}) {
  return (
    <ul className="mt-3 p-0 pt-2 border-top">
      <li className="d-flex justify-content-between">
        <p className="text-muted mb-1">Subtotal:</p>
        <p className="mb-0">${formatPrice(subtotal)}</p>
      </li>

      <li className="d-flex justify-content-between">
        <p className="text-muted mb-2">Envío:</p>
        <p className="mb-0">
          {shipping === 0 ? (
            <span className="text-success">Gratis</span>
          ) : (
            `$${formatPrice(shipping)}`
          )}
        </p>
      </li>

      {total !== undefined && (
        <li className="d-flex justify-content-between pt-2 border-top fw-bold fs-5">
          <p className="mb-0">Total:</p>
          <p className="text-primary mb-0">${formatPrice(total)}</p>
        </li>
      )}
    </ul>
  );
}

export default OrderTableSummary;
