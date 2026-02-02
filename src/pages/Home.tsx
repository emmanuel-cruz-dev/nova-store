import { useProducts } from "../hooks";
import {
  BannerCarousel,
  ComingSoon,
  ProductSlideList,
  TestimonialSlider,
  FeaturesSection,
  Newsletter,
  Categories,
  FAQs,
} from "../components";
import { bannerSlides } from "../data/bannerSlides";

function Home() {
  const { products, loading, error } = useProducts(1, 6);
  const hasProducts = products.length > 0;

  return (
    <>
      <BannerCarousel slides={bannerSlides} />

      {!loading && !hasProducts && <ComingSoon />}

      {hasProducts && (
        <>
          <Categories
            eyebrow="Explorá por categoría"
            heading="Encontrá lo que estás buscando"
            categories={["mujeres", "tecnologia", "gaming"]}
          />
          <ProductSlideList
            products={products}
            loading={loading}
            error={error as Error}
          />
        </>
      )}

      <FeaturesSection />
      <TestimonialSlider />

      {hasProducts && (
        <Categories
          eyebrow="Para cada estilo"
          heading="Productos para todos los gustos"
          categories={["gaming", "hombres", "tecnologia"]}
        />
      )}

      <FAQs />
      <Newsletter />
    </>
  );
}

export default Home;
