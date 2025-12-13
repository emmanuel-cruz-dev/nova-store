import { Link } from "react-router-dom";
import { Container, Card, Row, Col, Placeholder } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import HighlightedFeatures from "../common/HighlightedFeatures";
import { highlightedFeatures } from "../../data/highlightedFeatures";

function ProductDetailsCardSkeleton() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Container className="py-5">
      <header className="mb-4">
        <Link
          to="/products"
          className="text-decoration-none text-muted d-inline-flex align-items-center gap-2"
        >
          <ArrowLeft size={20} />
          Ir a la tienda
        </Link>
      </header>

      <Row className="g-4">
        <Col lg={6}>
          <Card className="shadow-sm border-0 mb-3">
            <Card.Body>
              <div
                className="bg-light rounded d-flex align-items-center justify-content-center"
                style={{ height: "320px" }}
              >
                <Placeholder
                  animation="glow"
                  style={{ width: "80%", height: "80%" }}
                >
                  <Placeholder
                    xs={12}
                    style={{ height: "100%", borderRadius: "0.5rem" }}
                  />
                </Placeholder>
              </div>
            </Card.Body>
          </Card>

          <HighlightedFeatures features={highlightedFeatures} />
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="d-flex flex-column">
              <Placeholder animation="glow" className="mb-3">
                <Placeholder
                  xs={3}
                  className="rounded-pill"
                  style={{ height: "32px" }}
                />
              </Placeholder>

              <Placeholder animation="glow" className="mb-3">
                <Placeholder xs={10} size="lg" />
              </Placeholder>

              <Placeholder animation="glow" className="mb-3">
                <Placeholder xs={4} style={{ height: "24px" }} />
              </Placeholder>

              <Placeholder animation="glow" className="mb-3">
                <Placeholder xs={5} size="lg" style={{ height: "48px" }} />
              </Placeholder>

              <Placeholder animation="glow" className="mb-3">
                <Placeholder xs={12} className="mb-2" />
                <Placeholder xs={11} className="mb-2" />
                <Placeholder xs={10} className="mb-2" />
                <Placeholder xs={9} className="mb-2" />
              </Placeholder>

              <Placeholder animation="glow" className="mb-3">
                <Placeholder
                  xs={4}
                  className="rounded-pill mb-2"
                  style={{ height: "40px" }}
                />
              </Placeholder>

              {isAuthenticated ? (
                <div className="d-flex gap-2">
                  <Placeholder.Button
                    variant="primary"
                    xs={9}
                    style={{ height: "48px" }}
                    animation="glow"
                  />
                  <Placeholder.Button
                    variant="outline-secondary"
                    xs={3}
                    style={{ height: "48px" }}
                    animation="glow"
                  />
                </div>
              ) : (
                <Placeholder.Button
                  variant="primary"
                  xs={12}
                  style={{ height: "48px" }}
                  animation="glow"
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetailsCardSkeleton;
