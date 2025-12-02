import { Card, Placeholder } from "react-bootstrap";

function ProductCardSkeleton() {
  return (
    <Card>
      <Placeholder
        as="div"
        animation="glow"
        style={{ height: "15rem", backgroundColor: "#e9ecef" }}
      />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{" "}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={12} animation="glow" />
      </Card.Body>
    </Card>
  );
}

export default ProductCardSkeleton;
