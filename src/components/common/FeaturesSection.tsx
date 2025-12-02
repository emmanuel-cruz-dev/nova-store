import { Container, Row, Col } from "react-bootstrap";
import { features } from "../../data/features";

function FeaturesSection() {
  return (
    <section className="py-5 bg-light" id="features">
      <Container className="py-0 py-lg-5">
        <Row className="g-4">
          {features.map((feature) => (
            <Col
              key={feature.id}
              xs={12}
              sm={6}
              md={4}
              lg
              className="text-center"
            >
              <div className="d-flex flex-column align-items-center py-2">
                <figure className="mb-3">{feature.icon}</figure>
                <h5 className="fw-bold mb-2">{feature.title}</h5>
                <p className="text-muted mb-0">{feature.subtitle}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturesSection;
