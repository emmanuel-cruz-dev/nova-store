import { ChevronUp } from "lucide-react";
import { useScroll } from "../../hooks";

function ScrollToTopButton() {
  const { isVisible, scrollToTop } = useScroll();

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-button"
          aria-label="Scroll to top"
          title="Ir hacia arriba"
        >
          <ChevronUp className="icon" />
        </button>
      )}
    </>
  );
}

export default ScrollToTopButton;
