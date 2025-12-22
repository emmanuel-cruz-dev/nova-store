import { Card } from "react-bootstrap";
import { Package } from "lucide-react";

function EmptyOrders({ title, message }: { title: string; message: string }) {
  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="text-center py-5">
        <Package size={64} className="text-muted mb-3" />
        <h4>{title}</h4>
        <p className="text-muted">{message}</p>
      </Card.Body>
    </Card>
  );
}

export default EmptyOrders;
