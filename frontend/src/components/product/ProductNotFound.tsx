import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";

function ProductNotFound() {
  return (
    <Container className="pt-5 pb-3">
      <header className="mb-4">
        <Link
          to="/products"
          className="text-decoration-none custom__text-muted d-flex align-items-center gap-2"
        >
          <ArrowLeft size={20} />
          Volver a la tienda
        </Link>
      </header>
      <Card className="shadow-sm border-0">
        <Card.Body className="text-center py-5">
          <h3 className="text-muted">Producto no encontrado</h3>
          <p className="text-muted">
            El producto que buscas no está disponible.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductNotFound;
