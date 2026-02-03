import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FavoritesState } from "../types";

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product) => {
        const favorites = get().favorites;
        const exists = favorites.some((p) => p.id === product.id);

        set({
          favorites: exists
            ? favorites.filter((p) => p.id !== product.id)
            : [...favorites, product],
        });
      },

      removeFavorite: (productId) => {
        set({
          favorites: get().favorites.filter((p) => p.id !== productId),
        });
      },

      isFavorite: (productId) => {
        return get().favorites.some((p) => p.id === productId);
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
    }
  )
);
