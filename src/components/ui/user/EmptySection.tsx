import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Package } from "lucide-react";

function EmptySection({ title, message }: { title: string; message: string }) {
  return (
    <Card className="shadow-sm border-0 py-2 py-md-5">
      <Card.Body className="text-center d-flex flex-column align-items-center justify-content-center py-lg-5">
        <Package size={64} className="text-muted mb-3" />

        <h4 className="fw-semibold mb-2">{title}</h4>
        <p className="text-muted mb-3">{message}</p>

        <Link to="/products" className="btn btn-primary mt-2">
          Explorar productos
        </Link>
      </Card.Body>
    </Card>
  );
}

export default EmptySection;
