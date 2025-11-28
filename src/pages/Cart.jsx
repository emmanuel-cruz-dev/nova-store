import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useCart, useAuth } from "../hooks";
import { CartItem, EmptyCartCard, OrderSummary } from "../components";

function Cart() {
  const { cart, getCartItemsCount, handleClearCart } = useCart();
  const { user } = useAuth();

  return (
    <Container className="py-5">
      <header className="mb-4">
        <h1 className="display-5 fw-bold mb-2">Mi carrito</h1>
        <div className="text-muted">
          {cart.length > 0 && (
            <>
              {user && (
                <span style={{ textTransform: "capitalize" }}>
                  {user.firstName}
                </span>
              )}{" "}
              tienes <strong>{getCartItemsCount()} </strong>
              {getCartItemsCount() === 1 ? "producto" : "productos"} en tu
              carrito
            </>
          )}
        </div>
      </header>

      <Row className="g-4" style={{ position: "relative" }}>
        <Col lg={8}>
          {cart.length > 0 ? (
            <Card className="shadow-sm border-0">
              <Card.Body className="p-0">
                {cart.map((product, index) => (
                  <CartItem key={product.id} product={product} index={index} />
                ))}
              </Card.Body>

              <Card.Footer className="bg-white border-top py-4">
                <Button
                  className="d-flex align-items-center justify-content-center gap-2 w-100"
                  size="sm"
                  onClick={handleClearCart}
                >
                  Vaciar carrito
                </Button>
              </Card.Footer>
            </Card>
          ) : (
            <EmptyCartCard />
          )}
        </Col>

        <OrderSummary />
      </Row>
    </Container>
  );
}

export default Cart;
