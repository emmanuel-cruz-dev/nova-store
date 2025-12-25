import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Button, Container, Row, Col, Image } from "react-bootstrap";
import { BannerSlide } from "../../types";

export default function BannerCarousel({ slides }: { slides: BannerSlide[] }) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <Carousel
      variant="dark"
      activeIndex={index}
      onSelect={(i) => setIndex(i)}
      interval={5000}
      pause="hover"
      indicators
      controls
      className="py-3 py-md-4"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)",
      }}
    >
      {slides.map((slide, idx) => {
        const imageRight = slide.imagePosition === "right";

        return (
          <Carousel.Item key={idx}>
            <Container>
              <Row
                className="align-items-center"
                xs={1}
                md={2}
                style={{ minHeight: 420 }}
              >
                <Col
                  md={6}
                  className={`mb-4 ${imageRight ? "order-md-2" : "order-md-1"}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    className="img-fluid rounded"
                  />
                </Col>

                <Col
                  md={6}
                  className={`text-center ${
                    imageRight ? "order-md-1" : "order-md-2"
                  }`}
                >
                  <h1 className="fw-bold mb-3 custom__text-primary">
                    {slide.title}
                  </h1>
                  <p className="custom__text-muted mb-4 p-md-5 py-md-0">
                    {slide.description}
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => navigate(slide.buttonLink)}
                    className="mb-4 mb-md-0 px-4"
                  >
                    {slide.buttonText}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
