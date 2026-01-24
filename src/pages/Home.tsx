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
  const hasProducts = products.length > 0;

  return (
    <>
      <BannerCarousel slides={bannerSlides} />

      {!loading && !hasProducts && (
        <section className="text-center py-5 my-5">
          <h3
            className="custom__text-primary mb-3"
            style={{ fontSize: "2rem" }}
          >
            Próximamente
          </h3>
          <p className="custom__text-muted" style={{ fontSize: "1.25rem" }}>
            Estamos preparando nuestro catálogo con los mejores productos para
            ti.
          </p>
        </section>
      )}

      {hasProducts && (
        <>
          <Categories categories={["mujeres", "tecnologia", "gaming"]} />
          <ProductSlideList
            title="Productos destacados"
            products={products}
            loading={loading}
            error={error}
          />
        </>
      )}

      <TestimonialSlider />
      <FeaturesSection />

      {hasProducts && (
        <Categories categories={["gaming", "hombres", "tecnologia"]} />
      )}
      <Newsletter />
    </>
  );
}

export default Home;
