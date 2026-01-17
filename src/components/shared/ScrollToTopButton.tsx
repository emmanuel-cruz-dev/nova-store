import { ChevronUp } from "lucide-react";
import CustomTooltip from "./CustomTooltip";
import { useScroll } from "../../hooks";

function ScrollToTopButton() {
  const { isVisible, scrollToTop } = useScroll();

  return (
    <>
      {isVisible && (
        <CustomTooltip text="Ir hacia arriba" placement="top">
          <button
            onClick={scrollToTop}
            className="scroll-to-top-button"
            aria-label="Scroll to top"
          >
            <ChevronUp className="icon" />
          </button>
        </CustomTooltip>
      )}
    </>
  );
}

export default ScrollToTopButton;
