import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "motion/react";
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
        <motion.header
          className="mb-2 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="custom__text-primary"
            style={{ fontWeight: "bold" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Bienvenido de nuevo
          </motion.h1>
          <motion.p
            className="custom__text-muted mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Ingresa tus credenciales para continuar
          </motion.p>
        </motion.header>

        <Row className="g-4">
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="p-4">
                  <motion.h2
                    className="h4 mb-3 custom__text-primary"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    Ya tengo una cuenta
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <LoginForm />
                  </motion.div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col lg={6} className="d-none d-lg-block">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            >
              <CreateAccountItem />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Login;
