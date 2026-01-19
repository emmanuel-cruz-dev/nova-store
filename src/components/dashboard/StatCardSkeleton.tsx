import { Card, Placeholder } from "react-bootstrap";

function StatCardSkeleton() {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Placeholder as="div" animation="glow">
          <Placeholder xs={6} className="mb-2" />
          <Placeholder xs={8} size="lg" className="mb-2" />
          <Placeholder xs={4} size="sm" />
        </Placeholder>
      </Card.Body>
    </Card>
  );
}

export default StatCardSkeleton;
