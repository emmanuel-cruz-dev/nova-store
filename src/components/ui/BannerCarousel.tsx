import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { BannerItemProps } from "../../types";
import "./BannerCarousel.css";

function BannerCarousel({ images }: BannerItemProps) {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={3000}
      pause="hover"
    >
      {images.map((img, index) => (
        <Carousel.Item
          key={index}
          onClick={() => navigate("/products")}
          style={{ cursor: "pointer" }}
        >
          <img
            src={img}
            alt={`Hero Banner ${index + 1}`}
            className="hero-banner__img"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BannerCarousel;
