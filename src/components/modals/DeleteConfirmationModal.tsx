import { Modal, Button } from "react-bootstrap";
import { Trash2 } from "lucide-react";
import { DeleteConfirmationModalProps } from "../../types";

function DeleteConfirmationModal({
  show,
  onClose,
  onConfirm,
  name,
  loading,
}: DeleteConfirmationModalProps) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center" style={{ fontSize: ".9rem" }}>
        ¿Estás seguro de que deseas eliminar el registro:{" "}
        <strong style={{ fontWeight: "500" }}>{name}</strong>?<br />
        Esta acción es permanente y no se puede deshacer.
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          <Trash2 size={16} className="me-1" />
          {loading ? "Eliminando..." : "Eliminar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModal;
