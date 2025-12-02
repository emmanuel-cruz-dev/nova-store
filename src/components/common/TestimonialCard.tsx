import { Card } from "react-bootstrap";

function TestimonialCard({ image, name, role, text }) {
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
            <h5 className="mb-0 fw-bold">{name}</h5>
            <p className="text-muted mb-0 small">{role}</p>
          </div>
        </div>
        <p
          className="text-secondary"
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
