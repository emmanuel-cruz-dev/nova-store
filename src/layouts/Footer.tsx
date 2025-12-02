import { Container, Row, Col } from "react-bootstrap";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Clock,
  Building,
  Mail,
} from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer
      className="footer navbar navbar-dark bg-black text-white"
      id="footer"
    >
      <Container className="py-4">
        <Row className="g-4 pt-3">
          <Col xs={12} md={6} lg={2} xl={3}>
            <header className="mb-3">
              <h4 className="fw-bold mb-3">NovaStore</h4>
              <p className="mb-0">
                Tu tienda online con las últimas tendencias y los mejores
                precios. Calidad y estilo en cada artículo.
              </p>
            </header>

            <ul className="d-flex gap-3 mt-3 list-unstyled">
              <li>
                <a
                  href="#"
                  className="text-white hover-primary"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover-primary"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover-primary"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover-primary"
                  aria-label="YouTube"
                >
                  <Youtube size={24} />
                </a>
              </li>
            </ul>
          </Col>

          <Col xs={12} md={6} lg={3} xl={2}>
            <h6 className="fw-bold mb-3">Atención al cliente</h6>
            <div className="d-flex align-items-center mb-3">
              <Phone size={18} className="me-2 text-primary flex-shrink-0" />
              <div className="small mb-0">
                <div className="fw-medium">0800 122 0338</div>
                <div style={{ color: "#6c757d" }}>Línea gratuita</div>
              </div>
            </div>

            <div className="d-flex align-items-center mb-3">
              <Clock size={18} className="me-2 text-primary flex-shrink-0" />
              <div className="small mb-0">
                <div>Lun a Vier 9 a 18 hs</div>
                <div>Sábados 9 a 13 hs</div>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6} lg={3} xl={2}>
            <h6 className="fw-bold mb-3">Venta telefónica</h6>
            <div className="d-flex align-items-center mb-3">
              <Phone size={18} className="me-2 text-primary flex-shrink-0" />
              <div className="small mb-0">
                <div className="fw-medium">0810 333 8700</div>
                <div style={{ color: "#6c757d" }}>Línea nacional</div>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <Clock size={18} className="me-2 text-primary flex-shrink-0" />
              <div className="small mb-0">
                <div>Lun a Miér 8 a 23 hs</div>
                <div>Jue a Vier 8 a 20 hs</div>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6} lg={3} xl={2}>
            <h6 className="fw-bold mb-3">Servicios a empresas</h6>
            <div className="d-flex align-items-center mb-3">
              <Building size={18} className="me-2 text-primary flex-shrink-0" />
              <div className="small mb-0">
                <div className="fw-medium">Ventas corporativas</div>
                <div style={{ color: "#6c757d" }}>Soluciones de ventas</div>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <Mail size={18} className="me-2 text-primary flex-shrink-0" />
              <div className="small mb-0">
                <div className="fw-medium">empresas@tienda.com</div>
                <div style={{ color: "#6c757d" }}>Contacto directo</div>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6} lg={3} xl={3}>
            <h6 className="fw-bold mb-3">Medios de pago</h6>
            <div className="small mb-3">
              <div className="fw-medium">Aceptamos todas las tarjetas</div>
              <div style={{ color: "#6c757d" }}>
                Crédito, Débito y Transferencias
              </div>
            </div>
            <div className="small">
              <div className="fw-medium">Financiación disponible</div>
              <div style={{ color: "#6c757d" }}>
                Hasta 12 cuotas sin interés
              </div>
            </div>
          </Col>
        </Row>

        <hr
          className="my-4"
          style={{ border: "1px solid #fff", opacity: 0.5, width: "100%" }}
        />

        <Row>
          <p className="mb-1 small fw-semibold">
            Copyright © 2025 NovaStore. Todos los derechos reservados.
            Desarrollado por{" "}
            <a
              href="https://emmanuel-cruz.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white footer__developer-link"
              aria-label="Emmanuel Cruz"
              title="Emmanuel Cruz Portfolio"
            >
              Emmanuel Cruz
            </a>
            .
          </p>
          <p className="mb-0 small" style={{ color: "#6c757d" }}>
            Las imágenes son meramente ilustrativas; los precios y stock pueden
            variar sin previo aviso.
          </p>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
