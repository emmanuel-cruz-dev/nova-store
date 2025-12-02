import { Link } from "react-router-dom";
import { Card, Button, Col } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import { useCart, useCheckoutOrder } from "../../hooks";
import { CheckoutModal } from "..";
import { formatPrice } from "../../utils/utils";

function OrderSummary() {
  const { cart, getCartTotal } = useCart();
  const {
    showModal,
    orderData,
    calculateTotal,
    handleCheckout,
    handleCloseModal,
  } = useCheckoutOrder();

  return (
    <>
      <Col lg={4}>
        <Card
          className="shadow-sm border-0"
          style={{ top: "100px", position: "sticky" }}
        >
          <Card.Body>
            <h4 className="mb-4">Resumen del pedido</h4>

            <ul className="d-flex justify-content-between mb-2 list-unstyled">
              <li className="text-muted">Subtotal</li>
              <li className="fw-semibold">${formatPrice(getCartTotal())}</li>
            </ul>

            <ul className="d-flex justify-content-between mb-2 list-unstyled">
              <li className="text-muted">Envío</li>
              <li className="fw-semibold">
                {getCartTotal() > 100000 ? (
                  <span className="text-success">Gratis</span>
                ) : (
                  "$5,000"
                )}
              </li>
            </ul>

            {getCartTotal() > 0 && getCartTotal() < 100000 && (
              <small className="text-muted" style={{ fontSize: "0.8rem" }}>
                Envío gratis a partir de $100,000
              </small>
            )}

            <hr />

            <ul className="d-flex justify-content-between mb-4 list-unstyled">
              <li className="fw-bold fs-5">Total</li>
              <li className="fw-bold fs-5 text-primary">
                {formatPrice(calculateTotal())}
              </li>
            </ul>

            <Button
              variant="primary"
              size="lg"
              className="w-100 mb-3"
              onClick={handleCheckout}
              disabled={cart.length === 0}
            >
              Finalizar compra
            </Button>

            <Link to="/products" className="text-decoration-none">
              <Button
                variant="outline-secondary py-2"
                size="sm"
                className="w-100"
              >
                <ArrowLeft size={16} className="me-2" />
                Seguir comprando
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>

      {orderData && (
        <CheckoutModal
          show={showModal}
          onHide={handleCloseModal}
          orderTotal={orderData.total}
          itemsCount={orderData.itemsCount}
        />
      )}
    </>
  );
}

export default OrderSummary;
