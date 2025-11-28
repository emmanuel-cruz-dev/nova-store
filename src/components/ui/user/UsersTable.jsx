import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useUserByRole } from "../../../hooks";
import {
  AtSign,
  CalendarDays,
  CircleDot,
  CircleUser,
  Eye,
  Trash2,
} from "lucide-react";
import { formatDateShort } from "../../../utils/utils";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  UserDetailsModal,
  DeleteConfirmationModal,
  PaginationItem,
  UsersTableRowSkeleton,
} from "../../../components";

function UsersTable() {
  const {
    users,
    loading,
    error,
    deleteUser,
    currentPage,
    totalPages,
    goToPage,
  } = useUserByRole("customer", 1, 10);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleShowDetails = (userId) => {
    setShowDetails(true);
    setSelectedUser(users.find((u) => u.id === userId));
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedUser(null);
  };

  const handleShowDeleteModal = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    const result = await deleteUser(userToDelete.id);

    if (result.success) {
      toast.success(
        `Usuario ${userToDelete.firstName} ${userToDelete.lastName} eliminado exitosamente`,
        {
          position: "bottom-left",
          autoClose: 3000,
        }
      );
      handleCloseDeleteModal();
      handleCloseDetails();
    } else {
      toast.error(
        "Error al eliminar el usuario. Por favor, intenta de nuevo.",
        {
          position: "bottom-left",
          autoClose: 3000,
        }
      );
    }

    setIsDeleting(false);
  };

  const handlePageChange = (page) => {
    window.scrollTo(0, 0);
    goToPage(page);
  };

  return (
    <section>
      <h2 className="mb-4">Usuarios</h2>

      <Table striped bordered hover responsive style={{ minWidth: "680px" }}>
        <thead>
          <tr>
            <th>
              <CircleUser size={16} className="mb-1" /> Nombre Completo
            </th>
            <th>
              <AtSign size={16} className="mb-1" /> Email
            </th>
            <th>
              <CalendarDays size={16} className="mb-1" /> Registrado
            </th>
            <th>
              <CircleDot size={16} className="mb-1" /> Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <UsersTableRowSkeleton key={`placeholder-${index}`} />
            ))
          ) : error ? (
            <tr>
              <td colSpan={6}>Error al cargar usuarios</td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img
                    className="rounded-circle"
                    style={{
                      width: "32px",
                      height: "32px",
                      objectFit: "cover",
                    }}
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                  />{" "}
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{formatDateShort(user.createdAt)}</td>
                <td className="d-flex gap-2">
                  <button
                    onClick={() => handleShowDetails(user.id)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Eye size={18} className="me-2" />
                    Ver detalles
                  </button>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleShowDeleteModal(user)}
                  >
                    <Trash2 size={18} className="me-2" />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {showDetails && (
        <UserDetailsModal
          user={selectedUser}
          onClose={handleCloseDetails}
          onDelete={handleShowDeleteModal}
        />
      )}

      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        name={
          userToDelete
            ? `${userToDelete.firstName} ${userToDelete.lastName}`
            : ""
        }
        isDeleting={isDeleting}
      />

      <ToastContainer
        position="bottom-left"
        pauseOnHover={true}
        theme="dark"
        transition={Bounce}
      />

      <PaginationItem
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={loading}
      />
    </section>
  );
}

export default UsersTable;
