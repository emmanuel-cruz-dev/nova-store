import BannerImg1 from "../assets/banners/banner1.webp";
import BannerImg2 from "../assets/banners/banner2.webp";
import BannerImg3 from "../assets/banners/banner3.webp";
import BannerImg4 from "../assets/banners/banner4.webp";
import BannerImg5 from "../assets/banners/banner5.webp";
import { BannerSlide } from "../types";

export const bannerSlides: BannerSlide[] = [
  {
    image: BannerImg1,
    title: "Samsung: potencia que se siente",
    description:
      "Smartphones Samsung con cámaras avanzadas, alto rendimiento y diseño premium. Elegí el modelo que va con tu día a día.",
    buttonText: "Ver destacados",
    buttonLink: "/products?category=tecnologia",
    imagePosition: "right",
  },
  {
    image: BannerImg2,
    title: "Subí de nivel tu experiencia gaming",
    description:
      "Periféricos y accesorios pensados para gamers. Más precisión, mejor rendimiento y máxima inmersión.",
    buttonText: "Explorar gaming",
    buttonLink: "/products?category=gaming",
    imagePosition: "left",
  },
  {
    image: BannerImg3,
    title: "Todo lo que buscás, en un solo lugar",
    description:
      "Tecnología, gaming y más. Descubrí productos seleccionados para cubrir todas tus necesidades.",
    buttonText: "Ver todos los productos",
    buttonLink: "/products",
    imagePosition: "right",
  },
  {
    image: BannerImg4,
    title: "Tecnología para tu día a día",
    description:
      "Celulares y accesorios pensados para acompañarte en cada momento, con calidad y rendimiento garantizados.",
    buttonText: "Descubrir tecnología",
    buttonLink: "/products?category=tecnologia",
    imagePosition: "right",
  },
  {
    image: BannerImg5,
    title: "Estilo que se nota",
    description:
      "Moda masculina con diseños actuales, cómodos y versátiles para cualquier ocasión.",
    buttonText: "Ver moda masculina",
    buttonLink: "/products?category=hombres",
    imagePosition: "right",
  },
];
