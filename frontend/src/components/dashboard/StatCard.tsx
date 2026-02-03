import { Card } from "react-bootstrap";
import StatCardSkeleton from "./StatCardSkeleton";
import { variantClasses, iconBgClasses } from "../../data/statCard";
import { StatCardProps } from "../../types";

function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = "primary",
  isLoading = false,
}: StatCardProps) {
  if (isLoading) {
    return <StatCardSkeleton />;
  }

  return (
    <Card
      className={`h-100 shadow-sm border-start border-1 ${variantClasses[variant]}`}
    >
      <Card.Body className="d-flex justify-content-between align-items-center gap-2 h-100">
        <div>
          <p className="custom__text-muted mb-1 fw-semibold">{title}</p>
          <h3 className="mb-2 fw-bold" style={{ fontSize: "1.4rem" }}>
            {value}
          </h3>
          {trend && (
            <p
              className={`mb-0 small ${
                trend.isPositive ? "custom__text-success" : "text-danger"
              }`}
            >
              <span className="fw-semibold">
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className="custom__text-muted ms-1">vs último mes</span>
            </p>
          )}
        </div>
        <aside
          className={`rounded-circle d-flex justify-content-center align-items-center ${iconBgClasses[variant]}`}
          style={{ width: "48px", height: "48px", flexShrink: 0 }}
        >
          <Icon size={24} />
        </aside>
      </Card.Body>
    </Card>
  );
}

export default StatCard;
