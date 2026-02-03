import { Row, Col } from "react-bootstrap";
import { HeartCrack } from "lucide-react";
import { useFavoritesStore } from "../../stores";
import { ProductCard, EmptySection, SectionHeader } from "../index";

function FavoritesSection() {
  const { favorites } = useFavoritesStore();

  return (
    <section>
      <SectionHeader
        title="Favoritos"
        subtitle="Productos que guardaste para ver más tarde"
      />
      {favorites.length === 0 ? (
        <EmptySection
          title="¿Todavía no tienes favoritos?"
          message="Marca los productos que te interesan y accede a ellos fácilmente luego."
          icon={<HeartCrack size={56} className="text-white" />}
        />
      ) : (
        <Row className="g-4">
          {favorites.map((product) => (
            <Col key={product.id} md={6} lg={4}>
              <ProductCard {...product} />
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
}

export default FavoritesSection;
