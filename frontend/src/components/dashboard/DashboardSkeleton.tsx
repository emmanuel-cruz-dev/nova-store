import { Row, Col, Placeholder, Card } from "react-bootstrap";

function DashboardSkeleton() {
  return (
    <section className="py-4">
      <Row className="g-4 mb-4">
        {[1, 2, 3, 4].map((i) => (
          <Col key={i} xs={12} sm={6} lg={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Placeholder as="div" animation="glow">
                  <Placeholder xs={6} className="mb-2" />
                  <Placeholder xs={8} size="lg" className="mb-2" />
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="g-4 mb-4">
        <Col xs={12} lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Placeholder as="div" animation="glow">
                <Placeholder xs={6} className="mb-4" />
                <div style={{ height: "250px" }} className="bg-light rounded" />
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Placeholder as="div" animation="glow">
                <Placeholder xs={6} className="mb-4" />
                <div style={{ height: "250px" }} className="bg-light rounded" />
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Card className="shadow-sm">
            <Card.Body>
              <Placeholder as="div" animation="glow">
                <Placeholder xs={6} className="mb-4" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="mb-3">
                    <Placeholder xs={12} />
                  </div>
                ))}
              </Placeholder>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default DashboardSkeleton;
