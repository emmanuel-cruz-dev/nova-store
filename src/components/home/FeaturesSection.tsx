import { Container, Row, Col } from "react-bootstrap";
import { useVisibleFeatures } from "../../hooks";
import HomeSectionHeader from "./HomeSectionHeader";
import { features } from "../../constants";

function FeaturesSection() {
  const visibleFeatures = useVisibleFeatures(features);

  return (
    <section className="py-5 bg-white" id="features">
      <HomeSectionHeader
        eyebrow="Beneficios que marcan la diferencia"
        heading="Comprá fácil, rápido y seguro"
      />
      <Container className="py-0 py-lg-5">
        <Row className="g-4">
          {visibleFeatures.map((feature) => (
            <Col
              key={feature.id}
              xs={12}
              sm={6}
              md={4}
              lg
              className="text-center"
            >
              <div className="d-flex flex-column align-items-center py-2">
                <figure className="mb-3">
                  <feature.icon />
                </figure>
                <h2
                  className="fw-bold mb-2 custom__text-primary"
                  style={{ fontSize: "1.3rem" }}
                >
                  {feature.title}
                </h2>
                <p className="custom__text-muted mb-0">{feature.subtitle}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturesSection;
