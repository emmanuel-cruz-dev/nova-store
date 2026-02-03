import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function CreateAccountItem() {
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="p-4">
        <h2 className="h4 mb-3 custom__text-primary">Crear cuenta</h2>
        <p className="text-muted mb-3">Crea una y aprovecha los beneficios:</p>

        <ul className="list-unstyled">
          <li className="mb-1 custom-bullet">
            Realiza tus compras de manera más ágil.
          </li>
          <li className="mb-1 custom-bullet">
            Guarda múltiples direcciones de envío y facturación.
          </li>
          <li className="mb-1 custom-bullet">
            Realiza el seguimiento a tus compras y revisa tus pedidos
            realizados.
          </li>
          <li className="mb-1 custom-bullet">
            Haz una lista de productos favoritos.
          </li>
        </ul>

        <Link to="/register" className="d-flex justify-content-end mt-3">
          <Button
            variant="primary"
            className="px-5 py-2"
            style={{ borderRadius: "25px", fontWeight: "500" }}
          >
            Crear cuenta
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default CreateAccountItem;
