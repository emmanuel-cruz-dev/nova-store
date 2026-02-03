import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "motion/react";
import { useAuthStore } from "../stores";
import { useCart } from "../hooks";
import { CartItem, EmptyCartCard, OrderSummary } from "../components";

function Cart() {
  const { user } = useAuthStore();
  const { cart, getCartItemsCount, handleClearCart } = useCart();

  return (
    <Container className="py-5">
      <motion.header
        className="mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="display-5 fw-bold mb-2 custom__text-primary">
          Mi carrito
        </h1>
        <motion.div
          className="custom__text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {cart.length > 0 && (
              <motion.span
                key="cart-info"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {user && (
                  <span style={{ textTransform: "capitalize" }}>
                    {user.firstName}
                  </span>
                )}{" "}
                tienes <strong>{getCartItemsCount()} </strong>
                {getCartItemsCount() === 1 ? "producto" : "productos"} en tu
                carrito
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      <Row className="g-4" style={{ position: "relative" }}>
        <Col lg={8}>
          <AnimatePresence mode="wait">
            {cart.length > 0 ? (
              <motion.div
                key="cart-items"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-0">
                    <AnimatePresence>
                      {cart.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.05,
                            ease: "easeOut",
                          }}
                          layout
                        >
                          <CartItem product={product} index={index} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </Card.Body>

                  <Card.Footer className="bg-white border-top py-4 d-grid d-md-flex justify-content-md-end">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button className="px-5" onClick={handleClearCart}>
                        Vaciar carrito
                      </Button>
                    </motion.div>
                  </Card.Footer>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="empty-cart"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <EmptyCartCard />
              </motion.div>
            )}
          </AnimatePresence>
        </Col>

        <OrderSummary />
      </Row>
    </Container>
  );
}

export default Cart;
