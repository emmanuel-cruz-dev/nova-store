import { Button, Badge } from "react-bootstrap";
import { X, Trash2, UserCog } from "lucide-react";
import { BulkUserActionsToolbarProps } from "../../types";

function BulkUserActionsToolbar({
  selectedCount,
  onClearSelection,
  onDelete,
  onChangeRole,
  isProcessing,
}: BulkUserActionsToolbarProps) {
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
              ? "usuario seleccionado"
              : "usuarios seleccionados"}
          </span>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <Button
            variant="light"
            size="sm"
            onClick={onChangeRole}
            disabled={isProcessing}
            className="d-flex align-items-center gap-1"
          >
            <UserCog size={16} />
            Cambiar Rol
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

export default BulkUserActionsToolbar;
