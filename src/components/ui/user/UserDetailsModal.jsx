import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { CircleUser, Mail, CalendarDays, Trash2 } from "lucide-react";
import { formatDateDetailed } from "../../../utils/utils";

function UserDetailsModal({ user, onClose, onDelete }) {
  return (
    <Modal show={true} onHide={onClose} centered dialogClassName="user-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold text-dark">
          Detalles del Usuario
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center px-4 pb-4">
        <figure className="position-relative d-flex justify-content-center mb-3">
          <img
            className="rounded-circle shadow avatar-enhanced"
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            style={{
              width: "140px",
              height: "140px",
              objectFit: "cover",
            }}
          />
        </figure>

        <ListGroup variant="flush" className="d-flex flex-column gap-3">
          <ListGroup.Item className="d-flex align-items-center py-3 list-item-clean">
            <CircleUser className="me-3 text-primary" size={22} />
            <aside className="text-start">
              <small>Nombre Completo</small>
              <div className="fw-semibold">
                {user.firstName} {user.lastName}
              </div>
            </aside>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex align-items-center py-3 list-item-clean">
            <Mail className="me-3 text-success" size={22} />
            <aside className="text-start">
              <small>Correo Electrónico</small>
              <div>{user.email}</div>
            </aside>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex align-items-center py-3 list-item-clean">
            <CalendarDays className="me-3 text-danger" size={22} />
            <aside className="text-start">
              <small>Registrado</small>
              <div>{formatDateDetailed(user.createdAt)}</div>
            </aside>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0">
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
        <Button variant="outline-danger" onClick={() => onDelete(user)}>
          <Trash2 size={16} className="me-1" />
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UserDetailsModal;
