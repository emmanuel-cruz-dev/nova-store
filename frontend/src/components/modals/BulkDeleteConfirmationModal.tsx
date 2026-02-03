import { Modal, Button, Alert } from "react-bootstrap";
import { Trash2 } from "lucide-react";
import { BulkDeleteConfirmationModalProps } from "../../types";

function BulkDeleteConfirmationModal({
  show,
  onHide,
  onConfirm,
  selectedCount,
  isProcessing,
}: BulkDeleteConfirmationModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger d-flex align-items-center gap-2">
          <Trash2 size={24} />
          Confirmar Eliminación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">
          <strong>¡Advertencia!</strong> Esta acción no se puede deshacer.
        </Alert>
        <p>
          ¿Estás seguro de que deseas eliminar <strong>{selectedCount}</strong>{" "}
          {selectedCount === 1 ? "producto" : "productos"}?
        </p>
        <p className="text-muted mb-0">
          <small>
            Todos los datos de{" "}
            {selectedCount === 1 ? "este producto" : "estos productos"} se
            eliminarán permanentemente.
          </small>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isProcessing}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={isProcessing}>
          {isProcessing ? "Eliminando..." : "Eliminar Permanentemente"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BulkDeleteConfirmationModal;
