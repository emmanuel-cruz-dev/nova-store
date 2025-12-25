import { useProducts } from "../hooks";
import {
  BannerCarousel,
  ProductSlideList,
  TestimonialSlider,
  FeaturesSection,
  Newsletter,
  Categories,
} from "../components";
import { bannerSlides } from "../data/bannerSlides";

function Home() {
  const { products, loading, error } = useProducts(1, 6);

  return (
    <>
      <BannerCarousel slides={bannerSlides} />
      <Categories categories={["mujeres", "tecnologia", "gaming"]} />
      <ProductSlideList
        title="Productos destacados"
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
