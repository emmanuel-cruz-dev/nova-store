import { useRef } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import TestimonialCard from "./TestimonialCard";
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
      <Container className="p-4 p-lg-5 bg-light rounded-3 position-relative">
        <header className="mb-4 d-flex justify-content-between align-items-center">
          <div>
            <h2 className="display-7 fw-bold mb-2">
              Lo que dicen nuestros clientes
            </h2>
            <div
              style={{
                width: "80px",
                height: "4px",
                backgroundColor: "#007bff",
              }}
            ></div>
          </div>

          <aside className="d-flex gap-3">
            <button
              ref={prevRef}
              className="swiper-button-prev-custom border-0"
            >
              ❮
            </button>
            <button
              ref={nextRef}
              className="swiper-button-next-custom border-0"
            >
              ❯
            </button>
          </aside>
        </header>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
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
      </Container>
    </section>
  );
}

export default TestimonialSlider;
