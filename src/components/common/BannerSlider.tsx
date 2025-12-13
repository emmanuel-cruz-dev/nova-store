import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { BannerItemProps } from "../../types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function BannerSlider({ images }: BannerItemProps) {
  return (
    <section className="p-0 m-0" id="hero-banner">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Hero Banner ${index + 1}`}
              className="hero-banner__img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default BannerSlider;
