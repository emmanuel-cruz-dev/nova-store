import { Row, Col } from "react-bootstrap";
import { useFavoritesStore } from "../../../stores";
import { ProductCard, EmptySection } from "../../index";

function FavoritesSection() {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0)
    return (
      <EmptySection
        title="¿Todavía no tienes favoritos?"
        message="Marca los productos que te interesan y accede a ellos fácilmente luego."
      />
    );

  return (
    <Row className="g-4">
      {favorites.map((product) => (
        <Col key={product.id} md={6} lg={4}>
          <ProductCard {...product} />
        </Col>
      ))}
    </Row>
  );
}

export default FavoritesSection;
