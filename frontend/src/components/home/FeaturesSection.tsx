import { Container, Row, Col } from "react-bootstrap";
import { motion } from "motion/react";
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
          {visibleFeatures.map((feature, index) => (
            <Col
              key={feature.id}
              xs={12}
              sm={6}
              md={4}
              lg
              className="text-center"
            >
              <motion.div
                className="d-flex flex-column align-items-center py-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <motion.figure
                  className="mb-3"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1 + 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.3 },
                  }}
                >
                  <feature.icon />
                </motion.figure>

                <motion.h2
                  className="fw-bold mb-2 custom__text-primary"
                  style={{ fontSize: "1.3rem" }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1 + 0.3,
                  }}
                >
                  {feature.title}
                </motion.h2>

                <motion.p
                  className="custom__text-muted mb-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1 + 0.4,
                  }}
                >
                  {feature.subtitle}
                </motion.p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default FeaturesSection;
