import { CategoryDataProps } from "../types";
import TecnologiaImg from "../assets/categories/tecnologia.webp";
import GamingImg from "../assets/categories/gaming.webp";
import MujeresImg from "../assets/categories/indumentaria-masculina.webp";
import HombresImg from "../assets/categories/indumentaria-femenina.webp";

export const categoryData: Record<string, CategoryDataProps> = {
  tecnologia: {
    id: "tecnologia",
    name: "Tecnología",
    image: TecnologiaImg,
  },
  gaming: {
    id: "gaming",
    name: "Gaming",
    image: GamingImg,
  },
  hombres: {
    id: "hombres",
    name: "Ropa de Hombre",
    image: HombresImg,
  },
  mujeres: {
    id: "mujeres",
    name: "Ropa de Mujer",
    image: MujeresImg,
  },
};
