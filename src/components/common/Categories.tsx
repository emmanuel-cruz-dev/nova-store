import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { categoryData } from "../../data/categoryData";
import { CategoriesProps } from "../../types";
import { getColSize } from "../../utils/common";

function Categories({ categories, maxCategories = null }: CategoriesProps) {
  const displayCategories = categories
    .map((catId) => categoryData[catId])
    .filter(Boolean)
    .slice(0, maxCategories || categories.length);

  return (
    <section className="py-5 bg-white p-4 p-md-0 p-md-5" id="categories">
      <Container>
        <Row>
          {displayCategories.map((category) => (
            <Col
              key={category.id}
              md={getColSize(displayCategories)}
              sm={6}
              className="g-4 g-md-5"
            >
              <Link
                to={`/products?category=${category.id}`}
                style={{ textDecoration: "none" }}
                title={`Ver productos de ${category.name}`}
              >
                <Card
                  className="border-0 overflow-hidden h-100 position-relative"
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s",
                    borderRadius: "16px",
                    aspectRatio: "447/300",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                      width={447}
                      height={300}
                    />
                  </div>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Categories;
