import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { House, ArrowLeft } from "lucide-react";
import { useNavigation } from "../hooks";

function NotFound() {
  const { handleGoBack } = useNavigation();

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "90vh" }}
    >
      <Row className="text-center">
        <Col xs={12}>
          <header>
            <h1
              className="display-1 fw-bold text-primary mb-0"
              style={{
                fontSize: "clamp(6rem, 12vw, 8rem)",
              }}
            >
              404
            </h1>
          </header>

          <main className="mb-4">
            <h2 className="h3 fw-bold mb-3">¡Oops! Página no encontrada</h2>
            <p className="lead mb-4 px-3">
              La página que estás buscando no existe o ha sido movida.
            </p>
          </main>

          <footer className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
            <Link to="/" className="text-decoration-none">
              <Button
                variant="primary"
                className="px-4 py-2 fw-semibold rounded-pill d-flex align-items-center"
              >
                <House className="me-2" size={18} />
                Ir al inicio
              </Button>
            </Link>

            <Button
              variant="outline-secondary"
              onClick={handleGoBack}
              className="px-4 py-2 fw-semibold rounded-pill d-flex align-items-center"
            >
              <ArrowLeft className="me-2" size={18} />
              Volver atrás
            </Button>
          </footer>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFound;
