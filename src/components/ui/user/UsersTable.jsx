import React from "react";
import { Table, Modal } from "react-bootstrap";
import { useUserByRole } from "../../../hooks";
import {
  AtSign,
  CalendarDays,
  CircleDot,
  CircleUser,
  Pencil,
  Trash2,
} from "lucide-react";

function UserDetailsModal({ user, onClose }) {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del usuario</Modal.Title>
      </Modal.Header>
      <img
        className="rounded-circle mt-4"
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          margin: "0 auto",
        }}
        src={user.avatar}
        alt={`${user.firstName} ${user.lastName}`}
      />
      <Modal.Body>
        <div className="d-flex flex-column">
          <p>
            Nombre Completo: {user.firstName} {user.lastName}
          </p>
          <p>Email: {user.email}</p>
          <p>Registrado: {formatDateDetailed(user.createdAt)}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={onClose} className="btn btn-primary">
          Cancelar
        </button>
        <button className="btn btn-danger">Eliminar</button>
      </Modal.Footer>
    </Modal>
  );
}

function formatDateShort(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "numeric",
    year: "2-digit",
  });
}

function formatDateDetailed(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Resultado: "lunes, 27 de octubre de 2025, 10:11"

function UsersTable() {
  const { users, loading, error } = useUserByRole("customer");
  const [showDetails, setShowDetails] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);

  const handleShowDetails = (userId) => {
    setShowDetails(true);
    setSelectedUser(users.find((u) => u.id === userId));
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedUser(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2 className="mb-4">Usuarios</h2>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center mb-2 ">
          <label className="form-label">Buscar usuario</label>
          <input className="form-control ml-2" type="text" />
        </div>
        <button className="btn btn-primary">Crear usuario</button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" name="checkAll" id="checkAll" />
            </th>

            <th>
              <CircleUser size={16} /> Nombre Completo
            </th>
            <th>
              <AtSign size={16} /> Email
            </th>
            <th>
              <CalendarDays size={16} /> Registrado
            </th>
            <th>
              <CircleDot size={16} /> Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <tr key={`placeholder-${index}`}>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
            ))
          ) : error ? (
            <tr>
              <td colSpan={6}>Error al cargar usuarios</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input type="checkbox" name="checkAll" id="checkAll" />
                </td>

                <td>
                  <img
                    className="rounded-circle"
                    style={{
                      width: "36px",
                      height: "36px",
                      objectFit: "cover",
                    }}
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                  />{" "}
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{formatDateShort(user.createdAt)}</td>
                <td>
                  <button
                    onClick={() => handleShowDetails(user.id)}
                    className="btn btn-primary"
                  >
                    <Pencil size={16} /> Ver detalles
                  </button>
                  <button className="btn btn-danger">
                    <Trash2 size={16} />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {showDetails && (
        <UserDetailsModal user={selectedUser} onClose={handleCloseDetails} />
      )}

      <footer className="d-flex justify-content-center">
        {/* <PaginationItem
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={loading}
        /> */}
      </footer>
    </section>
  );
}

export default UsersTable;
