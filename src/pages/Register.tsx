import { Container, Card } from "react-bootstrap";
import { RegisterForm } from "../components";

function Register() {
  return (
    <section
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "40px 0",
      }}
    >
      <Container style={{ maxWidth: "600px" }}>
        <header className="text-center mb-4">
          <h1 className="text-primary fw-bold mb-2">
            ¡Bienvenido a NovaStore!
          </h1>
          <p className="text-muted">
            Crea tu cuenta y disfruta de todos los beneficios
          </p>
        </header>

        <Card className="card shadow-sm border-0">
          <Card.Body className="card-body p-4 p-md-5">
            <h2 className="h3 mb-4">¿Aún no tenés cuenta? Registrate</h2>

            <RegisterForm />
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default Register;
