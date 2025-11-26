import React from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteProductConfirmModal({
  show,
  handleClose,
  handleConfirm,
  productName,
  loading,
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center" style={{ fontSize: ".9rem" }}>
        ¿Estás seguro de que quieres eliminar el producto{" "}
        <strong style={{ fontWeight: "500" }}>{productName}</strong>?<br />
        Esta acción es permanente y no se puede deshacer.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={loading}>
          {loading ? "Eliminando..." : "Eliminar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteProductConfirmModal;
