import { useState } from "react";

export const useCategorySelect = (category: string) => {
  const [selectedCategory, setSelectedCategory] = useState(category);

  const handleCategorySelect = (category: string) => () => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { selectedCategory, handleCategorySelect };
};
