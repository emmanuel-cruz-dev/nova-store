import { Container, Row, Col } from "react-bootstrap";

function AdminFooter() {
  return (
    <Container fluid className="py-3 px-4 py-md-4">
      <Row className="align-items-center">
        <Col
          xs={12}
          md={12}
          xl={4}
          className="text-center text-xl-start mb-2 mb-xl-0"
        >
          <div className="d-flex align-items-center justify-content-center justify-content-xl-start gap-2">
            <img
              src="/nova-store.ico"
              style={{ width: "24px", height: "24px" }}
              width={256}
              height={256}
              alt="Logo de NovaStore"
              loading="lazy"
            />
            <span className="fw-bold text-primary">
              Nova<span className="text-white fw-normal">Store</span>
              <span
                className="badge footer__badge-item"
                style={{ fontSize: ".9rem" }}
              >
                | Admin Panel
              </span>
            </span>
          </div>
        </Col>
        <Col xs={12} md={12} xl={4} className="text-center text-xl-end">
          <p className="mb-0 fs-6 fs-xl-5">
            © 2025 NovaStore. Desarrollado por{" "}
            <a
              href="https://emmanuel-cruz.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white footer__developer-link"
              aria-label="Emmanuel Cruz"
            >
              Emmanuel Cruz
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminFooter;
