import { Product } from "./product.types";

export interface FavoritesState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
  removeFavorite: (productId: number) => void;
  clearFavorites: () => void;
}
