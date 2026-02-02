import { useRef } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "motion/react";
import { TestimonialCard, HomeSectionHeader } from "../index";
import { testimonials } from "../../data/testimonials";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function TestimonialSlider() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      className="py-5 px-3"
      id="testimonials"
      style={{ backgroundColor: "#e9ecef" }}
    >
      <HomeSectionHeader
        eyebrow="Opiniones reales"
        heading="Lo que dicen nuestros clientes"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Container className="p-4 p-lg-5 py-lg-4 bg-light rounded-3 position-relative">
          <motion.div
            className="d-flex justify-content-end gap-3 mb-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              ref={prevRef}
              className="swiper-button-prev-custom border-0"
              style={{ touchAction: "manipulation" }}
              aria-label="Anterior"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              ❮
            </motion.button>
            <motion.button
              ref={nextRef}
              className="swiper-button-next-custom border-0"
              style={{ touchAction: "manipulation" }}
              aria-label="Siguiente"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              ❯
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                if (
                  typeof swiper.params.navigation === "object" &&
                  swiper.params.navigation !== null
                ) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
              style={{ paddingBottom: "3.5rem" }}
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <TestimonialCard {...testimonial} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}

export default TestimonialSlider;
