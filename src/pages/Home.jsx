import React from "react";
import { heroBannerImgs } from "../data/heroBannerImgs";
import { useProducts } from "../hooks";
import {
  BannerCarousel,
  ProductSlideList,
  TestimonialSlider,
  FeaturesSection,
  Newsletter,
} from "../components";

function Home() {
  const { products, loading, error } = useProducts(1, 6);

  return (
    <>
      <BannerCarousel images={heroBannerImgs} />
      <ProductSlideList
        title="Productos Destacados"
        products={products}
        loading={loading}
        error={error}
      />
      <TestimonialSlider />
      <FeaturesSection />
      <Newsletter />
    </>
  );
}

export default Home;
