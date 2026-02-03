import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "motion/react";
import { ProductCard, ErrorMessage, HomeSectionHeader } from "../index";
import { handleRetry } from "../../utils";
import { ProductsSlideListProps } from "../../types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowRight } from "lucide-react";

function ProductSlideList({
  eyebrow,
  heading,
  products,
  loading,
  error,
}: ProductsSlideListProps) {
  return (
    <Container
      className="py-5"
      id="product-slide-list"
      style={{ backgroundColor: "#f8f9fa", scrollMarginTop: "3.5rem" }}
    >
      <HomeSectionHeader
        eyebrow={eyebrow || "Selección especial"}
        heading={heading}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={26}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={!loading && products.length > 3}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
          style={{ paddingBottom: "3.5rem", paddingInline: "1rem" }}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide key={`placeholder-${index}`}>
                <ProductCard isLoading={true} />
              </SwiperSlide>
            ))
          ) : error ? (
            <Container className="d-flex justify-content-center fs-5">
              <ErrorMessage
                message="Error al cargar productos"
                onRetry={handleRetry}
              />
            </Container>
          ) : (
            products.map((product, index) => (
              <SwiperSlide key={`${product.id}-${index}`}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  brand={product.brand}
                  price={product.price}
                  description={product.description}
                  category={product.category}
                  image={product.image}
                />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </motion.div>

      {!error && (
        <motion.footer
          className="d-flex justify-content-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/products">
            <Button
              variant="primary"
              className="mt-4 px-4 d-inline-flex align-items-center gap-2"
            >
              Ver más productos
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </Button>
          </Link>
        </motion.footer>
      )}
    </Container>
  );
}

export default ProductSlideList;
