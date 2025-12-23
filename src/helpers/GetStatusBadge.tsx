import { Badge } from "react-bootstrap";
import { statusConfig } from "../data/statusConfig";

export const getStatusBadge = (status: string) => {
  const config = statusConfig[status as keyof typeof statusConfig];
  return <Badge bg={config.variant}>{config.text}</Badge>;
};
