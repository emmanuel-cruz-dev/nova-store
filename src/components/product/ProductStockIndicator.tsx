import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import { getStockStatus } from "../../utils/utils";

function ProductStockIndicator({ stock }: { stock: number }) {
  const status = getStockStatus(stock);

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip>{status.description}</Tooltip>}
    >
      <Badge
        bg={status.color}
        pill
        className="ms-2"
        style={{ color: "transparent" }}
      >
        ·
      </Badge>
    </OverlayTrigger>
  );
}

export default ProductStockIndicator;
