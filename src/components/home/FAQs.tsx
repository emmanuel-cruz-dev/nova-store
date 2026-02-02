import { Accordion, Container, Row, Col } from "react-bootstrap";
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
          <Accordion defaultActiveKey="0" flush>
            {faqs.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{faq.question}</Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
        <Col lg={4} md={12} className="text-center d-none d-lg-block">
          <img
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
          <p className="text-center px-2">
            <small
              className="custom__text-muted"
              style={{ fontStyle: "italic" }}
            >
              Una experiencia de compra simple, rápida y pensada para vos.
            </small>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default FAQs;
