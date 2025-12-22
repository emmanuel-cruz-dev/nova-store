import { Container, Row, Col, Card } from "react-bootstrap";
import { LoginForm, CreateAccountItem } from "../components";

function Login() {
  return (
    <section
      style={{
        backgroundColor: "#f5f5f5",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <Container>
        <header className="mb-2 text-center">
          <h1 className="text-primary" style={{ fontWeight: "bold" }}>
            Bienvenido de nuevo
          </h1>
          <p className="text-muted mb-4">
            Ingresa tus credenciales para continuar
          </p>
        </header>

        <Row className="g-4">
          <Col lg={6}>
            <Card className="shadow-sm border-0 h-100">
              <Card.Body className="p-4">
                <h2 className="h4 mb-3">Ya tengo una cuenta</h2>

                <LoginForm />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6} className="d-none d-lg-block">
            <CreateAccountItem />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
