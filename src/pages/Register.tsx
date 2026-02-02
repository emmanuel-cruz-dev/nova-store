import { Container, Card } from "react-bootstrap";
import { motion } from "motion/react";
import { RegisterForm } from "../components";

function Register() {
  return (
    <section
      style={{
        backgroundColor: "#f5f5f5",
        padding: "40px 0",
      }}
    >
      <Container style={{ maxWidth: "600px" }}>
        <motion.header
          className="text-center mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1
            className="custom__text-primary fw-bold mb-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            ¡Bienvenido a NovaStore!
          </motion.h1>
          <motion.p
            className="custom__text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Crea tu cuenta y disfruta de todos los beneficios
          </motion.p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        >
          <Card className="card shadow-sm border-0">
            <Card.Body className="card-body p-4 p-md-5">
              <motion.h2
                className="h3 mb-4 custom__text-primary text-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                ¿Aún no tienes cuenta? Regístrate
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <RegisterForm />
              </motion.div>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}

export default Register;
