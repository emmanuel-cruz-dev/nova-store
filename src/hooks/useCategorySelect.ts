import { useState } from "react";

export const useCategorySelect = (category) => {
  const [selectedCategory, setSelectedCategory] = useState(category);

  const handleCategorySelect = (category) => () => {
    setSelectedCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { selectedCategory, handleCategorySelect };
};
