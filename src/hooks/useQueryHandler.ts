import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCategorySelect } from "./useCategorySelect";

export const useQueryHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const { selectedCategory, handleCategorySelect } =
    useCategorySelect(categoryParam);

  useEffect(() => {
    if (categoryParam !== selectedCategory) {
      handleCategorySelect(categoryParam)();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam]);

  const handleCategoryClick = (categoryId) => {
    handleCategorySelect(categoryId)();
    setSearchParams({ category: categoryId });
  };

  return { selectedCategory, handleCategoryClick };
};
