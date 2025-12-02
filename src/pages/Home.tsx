import { useProducts } from "../hooks";
import {
  BannerCarousel,
  ProductSlideList,
  TestimonialSlider,
  FeaturesSection,
  Newsletter,
  Categories,
} from "../components";
import { heroBannerImgs } from "../data/heroBannerImgs";

function Home() {
  const { products, loading, error } = useProducts(1, 6);

  return (
    <>
      <BannerCarousel images={heroBannerImgs} />
      <Categories categories={["mujeres", "tecnologia", "gaming"]} />
      <ProductSlideList
        title="Productos Destacados"
        products={products}
        loading={loading}
        error={error}
      />
      <TestimonialSlider />
      <FeaturesSection />
      <Categories categories={["gaming", "hombres", "tecnologia"]} />
      <Newsletter />
    </>
  );
}

export default Home;
