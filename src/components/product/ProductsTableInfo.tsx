import { Badge } from "react-bootstrap";
import { Info } from "lucide-react";

function ProductsTableInfo() {
  return (
    <div className="d-flex justify-content-between align-items-start mt-2">
      <small
        className="text-muted d-flex align-items-center gap-1 mt-1"
        style={{ lineHeight: 1 }}
      >
        <Info size={15} />
        Los productos <strong>inactivos</strong> no se muestran a los clientes
      </small>

      <ul className="d-flex gap-1 mb-0 list-unstyled">
        <li>
          <Badge bg="danger">Crítico</Badge>
        </li>
        <li>
          <Badge bg="warning">Bajo</Badge>
        </li>
        <li>
          <Badge bg="success">OK</Badge>
        </li>
        <li>
          <Badge bg="primary">Alto</Badge>
        </li>
      </ul>
    </div>
  );
}

export default ProductsTableInfo;
