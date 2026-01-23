import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { UserCog } from "lucide-react";
import { RoleChangeModalProps, UserRole } from "../../types";

export function RoleChangeModal({
  show,
  onHide,
  onConfirm,
  selectedCount,
  isProcessing,
}: RoleChangeModalProps) {
  const [newRole, setNewRole] = useState<UserRole>("customer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(newRole);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <UserCog size={24} />
          Cambiar Rol de Usuarios
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Alert variant="info" className="mb-3">
            <small>
              Esta acción afectará a <strong>{selectedCount}</strong>{" "}
              {selectedCount === 1 ? "usuario" : "usuarios"}
            </small>
          </Alert>

          <Form.Group>
            <Form.Label htmlFor="role">Nuevo rol</Form.Label>
            <Form.Select
              id="role"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as UserRole)}
            >
              <option value="customer">Cliente</option>
              <option value="admin">Administrador</option>
            </Form.Select>
            <Form.Text className="text-muted">
              {newRole === "admin"
                ? "Los usuarios seleccionados tendrán acceso al panel de administración"
                : "Los usuarios seleccionados solo tendrán acceso como clientes"}
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isProcessing}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" disabled={isProcessing}>
            {isProcessing ? "Procesando..." : "Cambiar Rol"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
