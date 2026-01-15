import { Offcanvas, Button, ListGroup } from "react-bootstrap";
import { CircleUser, Mail, CalendarDays, Trash2 } from "lucide-react";
import { formatDateDetailed } from "../../../utils";
import { UserDetailsSidebarProps } from "../../../types";

function UserDetailsSidebar({
  user,
  onClose,
  onDelete,
}: UserDetailsSidebarProps) {
  return (
    <Offcanvas show={true} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="fw-bold">
          Detalles del Usuario
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column">
        <div className="text-center mb-4">
          <img
            className="rounded-circle shadow"
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
            }}
          />
        </div>

        <ListGroup variant="flush" className="flex-grow-1">
          <ListGroup.Item className="d-flex align-items-center py-3 border-0 bg-light rounded mb-2">
            <CircleUser
              className="me-3 custom__text-primary flex-shrink-0"
              size={22}
            />
            <div className="text-start">
              <small className="text-muted d-block">Nombre Completo</small>
              <div className="fw-semibold">
                {user.firstName} {user.lastName}
              </div>
            </div>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex align-items-center py-3 border-0 bg-light rounded mb-2">
            <Mail className="me-3 text-success flex-shrink-0" size={22} />
            <div className="text-start">
              <small className="text-muted d-block">Correo Electrónico</small>
              <div className="text-break">{user.email}</div>
            </div>
          </ListGroup.Item>

          <ListGroup.Item className="d-flex align-items-center py-3 border-0 bg-light rounded">
            <CalendarDays
              className="me-3 text-danger flex-shrink-0"
              size={22}
            />
            <div className="text-start">
              <small className="text-muted d-block">Registrado</small>
              <div>{formatDateDetailed(user.createdAt!)}</div>
            </div>
          </ListGroup.Item>
        </ListGroup>

        <div className="d-flex gap-2 mt-auto pt-3 border-top">
          <Button variant="secondary" onClick={onClose} className="flex-fill">
            Cerrar
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => onDelete(user)}
            className="flex-fill"
          >
            <Trash2 size={16} className="me-1" />
            Eliminar
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default UserDetailsSidebar;
