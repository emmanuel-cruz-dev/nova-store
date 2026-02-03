import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel, Button, Container, Row, Col, Image } from "react-bootstrap";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
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
        const isActive = idx === index;

        return (
          <Carousel.Item key={idx}>
            <AnimatePresence mode="wait">
              {isActive && (
                <Container>
                  <Row
                    className="align-items-center"
                    xs={1}
                    md={2}
                    style={{ minHeight: 420 }}
                  >
                    <Col
                      md={6}
                      className={`mb-4 ${
                        imageRight ? "order-md-2" : "order-md-1"
                      }`}
                    >
                      <motion.div
                        key={`image-${idx}`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          className="img-fluid rounded"
                        />
                      </motion.div>
                    </Col>

                    <Col
                      md={6}
                      className={`text-center ${
                        imageRight ? "order-md-1" : "order-md-2"
                      }`}
                    >
                      <motion.h1
                        key={`title-${idx}`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4 }}
                        className="fw-bold mb-3 custom__text-primary"
                      >
                        {slide.title}
                      </motion.h1>

                      <motion.p
                        key={`desc-${idx}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="custom__text-muted mb-4 p-md-5 py-md-0"
                      >
                        {slide.description}
                      </motion.p>

                      <motion.div
                        key={`button-${idx}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <Button
                          variant="primary"
                          onClick={() => navigate(slide.buttonLink)}
                          className="px-4 mb-4 mb-md-0 d-inline-flex align-items-center gap-2"
                        >
                          {slide.buttonText}
                          <ArrowRight size={20} />
                        </Button>
                      </motion.div>
                    </Col>
                  </Row>
                </Container>
              )}
            </AnimatePresence>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
