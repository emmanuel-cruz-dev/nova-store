import React from "react";
import { heroBannerImgs } from "../data/heroBannerImgs";
import {
  BannerCarousel,
  ProductSlideList,
  TestimonialSlider,
  FeaturesSection,
  Newsletter,
} from "../components";
import { useProducts } from "../hooks/useProducts";

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
