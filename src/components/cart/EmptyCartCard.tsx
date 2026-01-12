import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { ShoppingBag } from "lucide-react";
import { useAuthStore } from "../../stores";

function EmptyCartCard() {
  const { user } = useAuthStore();

  return (
    <Card className="shadow-sm border-0 text-center py-5">
      <Card.Body>
        <ShoppingBag size={64} className="custom__text-muted mb-3" />
        <h4 className="mb-1">
          {user ? (
            <>
              <span style={{ textTransform: "capitalize" }}>
                {user.firstName}
              </span>
              , tu carrito está vacío
            </>
          ) : (
            "Tu carrito está vacío"
          )}
        </h4>
        <p className="custom__text-muted mb-4">
          Agrega productos para comenzar tu compra
        </p>
        <Link to="/products">
          <Button
            variant="primary"
            style={{ padding: "0.5rem 1.5rem", fontSize: "1.1rem" }}
          >
            Ir a la tienda
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default EmptyCartCard;
