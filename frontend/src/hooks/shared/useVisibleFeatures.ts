import { useEffect, useState } from "react";
import { FeatureProps } from "../../types";

export const useVisibleFeatures = (features: FeatureProps[]) => {
  const [visibleFeatures, setVisibleFeatures] = useState(features);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 992) {
        setVisibleFeatures(features.slice(0, 3));
      } else {
        setVisibleFeatures(features);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [features]);

  return visibleFeatures;
};
