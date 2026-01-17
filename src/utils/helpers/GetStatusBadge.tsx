import { Badge } from "react-bootstrap";
import { statusConfig } from "../../constants/status";

export const getStatusBadge = (status: string) => {
  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <Badge
      pill
      className={`bg-white border text-${config.variant} border-${config.variant}`}
    >
      {config.text}
    </Badge>
  );
};
