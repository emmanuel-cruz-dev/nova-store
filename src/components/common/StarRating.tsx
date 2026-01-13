import { Star } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-2">
      <p className="mb-0 fw-bold custom__text-muted">{rating}</p>
      <div className="d-flex me-2">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
            fill={rating >= index + 1 ? "#ffc107" : "none"}
            color="#ffc107"
          />
        ))}
      </div>
    </div>
  );
}

export default StarRating;
