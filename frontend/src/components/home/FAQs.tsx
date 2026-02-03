import { Accordion, Container, Row, Col } from "react-bootstrap";
import { motion } from "motion/react";
import Logo from "../../assets/logos/nova-store-logo.avif";
import HomeSectionHeader from "./HomeSectionHeader";
import { faqs } from "../../data/faqs";
import "./FAQs.css";

function FAQs() {
  return (
    <Container className="py-5" id="faq">
      <HomeSectionHeader
        eyebrow="Todo lo que necesitás saber"
        heading="Respondemos tus preguntas"
      />
      <Row className="justify-content-center align-items-center">
        <Col lg={7} md={12} className="mb-4 mb-lg-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Accordion defaultActiveKey="0" flush>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        </Col>

        <Col lg={4} md={12} className="text-center d-none d-lg-block">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.img
              src={Logo}
              alt="Nova Store logo"
              className="img-fluid mb-2"
              style={{
                filter: "drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.45))",
                maxWidth: "160px",
              }}
              width={480}
              height={480}
            />

            <motion.p
              className="text-center px-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <small
                className="custom__text-muted"
                style={{ fontStyle: "italic" }}
              >
                Una experiencia de compra simple, rápida y pensada para vos.
              </small>
            </motion.p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
}

export default FAQs;
