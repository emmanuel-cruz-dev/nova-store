import { Button, Badge } from "react-bootstrap";
import {
  X,
  Trash2,
  Package,
  Tag,
  TrendingUp,
  PackageCheck,
  PackageX,
} from "lucide-react";
import { BulkActionsToolbarProps } from "../../types";

function BulkActionsToolbar({
  selectedCount,
  onClearSelection,
  onActivate,
  onDeactivate,
  onDelete,
  onAdjustStock,
  onApplyDiscount,
  onAdjustPrice,
  isProcessing,
}: BulkActionsToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <section
      className="bg-white border rounded shadow-sm p-3 mb-3 sticky-top"
      style={{ top: "70px", zIndex: 100 }}
    >
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div className="d-flex align-items-center gap-2">
          <span className="fw-semibold custom__text-muted">
            <Badge bg="primary" className="me-2">
              {selectedCount}
            </Badge>
            {selectedCount === 1
              ? "producto seleccionado"
              : "productos seleccionados"}
          </span>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <Button
            variant="light"
            size="sm"
            onClick={onActivate}
            disabled={isProcessing}
            className="d-flex align-items-center gap-1"
          >
            <PackageCheck size={16} />
            Activar
          </Button>

          <Button
            variant="light"
            size="sm"
            onClick={onDeactivate}
            disabled={isProcessing}
            className="d-flex align-items-center gap-1"
          >
            <PackageX size={16} />
            Desactivar
          </Button>

          <Button
            variant="light"
            size="sm"
            onClick={onAdjustStock}
            disabled={isProcessing}
            className="d-flex align-items-center gap-1"
          >
            <Package size={16} />
            Ajustar Stock
          </Button>

          <Button
            variant="light"
            size="sm"
            onClick={onApplyDiscount}
            disabled={isProcessing}
            className="d-flex align-items-center gap-1"
          >
            <Tag size={16} />
            Aplicar Descuento
          </Button>

          <Button
            variant="light"
            size="sm"
            onClick={onAdjustPrice}
            disabled={isProcessing}
            className="d-flex align-items-center gap-1"
          >
            <TrendingUp size={16} />
            Ajustar Precios
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
            disabled={isProcessing}
            className="d-flex align-items-center gap-1"
          >
            <Trash2 size={16} />
            Eliminar
          </Button>

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onClearSelection}
            disabled={isProcessing}
            className="d-flex align-items-center gap-1 custom__text-muted"
          >
            <X size={16} />
            Cancelar
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BulkActionsToolbar;
