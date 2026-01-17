import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Bounce, ToastContainer } from "react-toastify";
import { useNewsletterSubscription } from "../../hooks";

function Newsletter() {
  const { email, setEmail, handleSubmit } = useNewsletterSubscription();

  return (
    <section
      style={{
        backgroundColor: "#0B5394",
        padding: "60px 0",
        width: "100%",
      }}
      id="newsletter"
    >
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} className="text-center">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <h2
                className="mb-0"
                style={{
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                }}
              >
                Newsletter{" "}
                <span style={{ fontWeight: "400" }}>
                  ¡Recibí nuestras novedades en tu email!
                </span>
              </h2>
            </div>

            <Form
              onSubmit={handleSubmit}
              className="d-flex justify-content-center"
            >
              <div
                style={{
                  display: "flex",
                  maxWidth: "600px",
                  backgroundColor: "white",
                  borderRadius: "25px",
                  width: "100%",
                  gap: "0",
                }}
              >
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ingresá tu Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    borderRadius: "25px 0 0 25px",
                    padding: "12px 24px",
                    border: "none",
                    fontSize: "1rem",
                  }}
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#0B5394",
                    border: "2px solid white",
                    borderRadius: "25px",
                    padding: "12px 38px",
                    fontWeight: "600",
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  Suscribirse
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer
        position="bottom-left"
        pauseOnHover={true}
        theme="dark"
        transition={Bounce}
      />
    </section>
  );
}

export default Newsletter;
