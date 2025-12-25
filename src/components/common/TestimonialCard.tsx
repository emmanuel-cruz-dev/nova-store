import { Card } from "react-bootstrap";
import { TestimonialCardProps } from "../../types";

function TestimonialCard({ image, name, role, text }: TestimonialCardProps) {
  return (
    <Card
      className="h-100 border-0 shadow-sm"
      style={{
        backgroundColor: "#f2f3f5",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <Card.Body className="p-4">
        <div className="d-flex align-items-center mb-4">
          <img
            src={image}
            alt={name}
            className="rounded-circle me-3"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              border: "3px solid #fff",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
          <div>
            <h3
              className="mb-0 fw-bold custom__text-primary"
              style={{ fontSize: "1.2rem" }}
            >
              {name}
            </h3>
            <p className="custom__text-muted mb-0 small">{role}</p>
          </div>
        </div>
        <p
          style={{
            fontSize: "0.95rem",
            lineHeight: "1.7",
          }}
        >
          {text}
        </p>
      </Card.Body>
    </Card>
  );
}

export default TestimonialCard;
