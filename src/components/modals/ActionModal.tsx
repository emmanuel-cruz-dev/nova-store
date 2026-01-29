import { FormEvent } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { ActionModalProps } from "../../types";

function ActionModal({
  show,
  onHide,
  onSubmit,
  title,
  icon: Icon,
  selectedCount,
  isProcessing,
  confirmText = "Aplicar",
  children,
  isValid,
}: ActionModalProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <Icon size={24} />
          {title}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Alert variant="info" className="mb-3">
            <small>
              Esta acción afectará a <strong>{selectedCount}</strong>{" "}
              {selectedCount === 1 ? "producto" : "productos"}
            </small>
          </Alert>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isProcessing}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isProcessing || !isValid}
          >
            {isProcessing ? "Procesando..." : confirmText}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ActionModal;
