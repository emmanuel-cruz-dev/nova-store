import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

function EmptySection({
  title,
  message,
  icon,
  showButton = true,
}: {
  title: string;
  message: string;
  icon: React.ReactNode;
  showButton?: boolean;
}) {
  return (
    <Card className="shadow-sm border-0 py-2 py-md-5">
      <Card.Body className="text-center d-flex flex-column align-items-center justify-content-center py-lg-5">
        <figure
          className="d-flex justify-content-center align-items-center mb-3 rounded-circle custom__bg-primary"
          style={{ width: "6.5rem", height: "6.5rem" }}
        >
          {icon}
        </figure>

        <h2
          className="custom__text-secondary fw-semibold mb-2"
          style={{ fontSize: "1.5rem" }}
        >
          {title}
        </h2>
        <p className="custom__text-muted mb-3">{message}</p>

        {showButton && (
          <Link to="/products" className="btn btn-primary mt-2 px-4 py-2">
            Explorar productos
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default EmptySection;
