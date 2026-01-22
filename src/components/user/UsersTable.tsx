import { Button } from "react-bootstrap";
import { ToastContainer, Bounce } from "react-toastify";
import { Users } from "lucide-react";
import { useUsersTable, useUsersFilter } from "../../hooks";
import {
  DeleteConfirmationModal,
  PaginationItem,
  UsersTableRowSkeleton,
  UserDetailsSidebar,
  SectionHeader,
  EmptySection,
  UsersFilters,
  UserTableHeader,
  UserTableWrapper,
  UserRow,
} from "..";
import { User } from "../../types";

function UsersTable() {
  const {
    users,
    loading,
    error,
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
  } = useUsersTable("customer", 1, 100);

  const {
    paginatedUsers,
    filteredUsers,
    currentPage,
    totalPages,
    searchTerm,
    activityFilter,
    dateFilter,
    hasActiveFilters,
    setSearchTerm,
    setActivityFilter,
    setDateFilter,
    clearFilters,
    handlePageChange,
  } = useUsersFilter(users);

  const renderTableContent = () => {
    if (loading) {
      return (
        <>
          <UserTableHeader />
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <UsersTableRowSkeleton key={`placeholder-${index}`} />
            ))}
          </tbody>
        </>
      );
    }

    if (error) {
      return (
        <>
          <UserTableHeader />
          <tbody>
            <tr>
              <td colSpan={5} className="text-center text-danger">
                Error al cargar usuarios
              </td>
            </tr>
          </tbody>
        </>
      );
    }

    return (
      <>
        <UserTableHeader />
        <tbody>
          {paginatedUsers.map((user: User) => (
            <UserRow
              key={user.id}
              user={user}
              onShowDetails={handleShowDetails}
              onDelete={handleShowDeleteModal}
            />
          ))}
        </tbody>
      </>
    );
  };

  const showEmptyState = !loading && users.length === 0;
  const showNoResults =
    !loading && !error && users.length > 0 && filteredUsers.length === 0;
  const showTable =
    loading || error || (!loading && !error && filteredUsers.length > 0);

  return (
    <section>
      <SectionHeader
        title="Usuarios"
        subtitle="Administra los usuarios registrados en la plataforma"
      />

      <UsersFilters
        searchTerm={searchTerm}
        activityFilter={activityFilter}
        dateFilter={dateFilter}
        hasActiveFilters={hasActiveFilters}
        usersCount={users.length}
        filteredCount={filteredUsers.length}
        loading={loading}
        setSearchTerm={setSearchTerm}
        setActivityFilter={setActivityFilter}
        setDateFilter={setDateFilter}
        clearFilters={clearFilters}
      />

      {showEmptyState && (
        <EmptySection
          title="Aún no hay usuarios registrados"
          message="Cuando los usuarios se registren, aparecerán listados aquí."
          icon={<Users size={56} className="text-white" />}
          showButton={false}
        />
      )}

      {showNoResults && (
        <div className="text-center py-5 bg-light rounded">
          <h5 className="text-muted">No se encontraron usuarios</h5>
          <p className="text-muted">
            Intenta ajustar los filtros o{" "}
            <Button
              variant="link"
              className="p-0 text-decoration-none align-baseline"
              onClick={clearFilters}
            >
              limpiar todos los filtros
            </Button>
          </p>
        </div>
      )}

      {showTable && <UserTableWrapper>{renderTableContent()}</UserTableWrapper>}

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

      {totalPages > 1 && (
        <PaginationItem
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isLoading={loading}
        />
      )}

      <ToastContainer
        position="bottom-left"
        pauseOnHover={true}
        theme="dark"
        transition={Bounce}
      />
    </section>
  );
}

export default UsersTable;
