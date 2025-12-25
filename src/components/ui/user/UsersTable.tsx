import { Table } from "react-bootstrap";
import { ToastContainer, Bounce } from "react-toastify";
import {
  AtSign,
  CalendarDays,
  CircleDot,
  CircleUser,
  Eye,
  Trash2,
} from "lucide-react";
import { useUsersTable } from "../../../hooks";
import {
  DeleteConfirmationModal,
  PaginationItem,
  UsersTableRowSkeleton,
  UserDetailsSidebar,
} from "../..";
import { formatDateShort } from "../../../utils/utils";
import { User } from "../../../types";

function UsersTable() {
  const {
    users,
    loading,
    error,
    currentPage,
    totalPages,
    showDetails,
    selectedUser,
    showDeleteModal,
    userToDelete,
    isDeleting,
    handleShowDetails,
    handleCloseDetails,
    handleShowDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
    handlePageChange,
  } = useUsersTable("customer", 1, 10);

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
            users.map((user: User) => (
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
                <td>{formatDateShort(user.createdAt as string)}</td>
                <td className="d-flex gap-2">
                  <button
                    onClick={() => handleShowDetails(user.id as number)}
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
        <UserDetailsSidebar
          user={selectedUser as User}
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
        loading={isDeleting}
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
