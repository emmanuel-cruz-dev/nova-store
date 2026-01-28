import { useState } from "react";
import { Button } from "react-bootstrap";
import { ToastContainer, Bounce } from "react-toastify";
import { Info, Users } from "lucide-react";
import {
  useUsersTable,
  useUsersFilter,
  useBulkSelection,
  useBulkUserActions,
} from "../../hooks";
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
  BulkUserActionsToolbar,
  RoleChangeModal,
  BulkDeleteConfirmationModal,
} from "..";
import { useAuthStore } from "../../stores";
import { formatRoleName } from "../../utils";
import { CheckboxState, User, UserRole } from "../../types";

function UsersTable() {
  const { user } = useAuthStore();
  const roleName = formatRoleName(user?.role);

  const {
    users: allUsers,
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
    mutate,
  } = useUsersTable("all", 1, 100);

  const filteredUsersByRole = allUsers.filter((u: User) => {
    if (u.id === user?.id) return false;

    if (user?.role === "super_admin") {
      return u.role === "admin" || u.role === "customer";
    }
    if (user?.role === "admin") {
      return u.role === "customer";
    }
    return false;
  });

  const {
    paginatedUsers,
    filteredUsers,
    currentPage,
    totalPages,
    searchTerm,
    roleFilter,
    activityFilter,
    dateFilter,
    hasActiveFilters,
    setSearchTerm,
    setRoleFilter,
    setActivityFilter,
    setDateFilter,
    clearFilters,
    handlePageChange,
  } = useUsersFilter(filteredUsersByRole);

  const {
    selectedIds,
    selectedItems,
    selectedCount,
    isSelected,
    toggleSelection,
    toggleSelectAll,
    checkboxState,
    deselectAll,
  } = useBulkSelection(paginatedUsers);

  const { isProcessing, bulkDeleteUsers, bulkChangeRole } = useBulkUserActions(
    () => {
      mutate();
      deselectAll();
    }
  );

  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const [showRoleChangeModal, setShowRoleChangeModal] = useState(false);

  const handleBulkDelete = () => {
    setShowBulkDeleteModal(true);
  };

  const confirmBulkDelete = () => {
    bulkDeleteUsers(selectedIds);
    setShowBulkDeleteModal(false);
  };

  const handleRoleChange = () => {
    setShowRoleChangeModal(true);
  };

  const confirmRoleChange = (newRole: UserRole) => {
    bulkChangeRole(selectedItems, newRole);
    setShowRoleChangeModal(false);
  };

  const renderTableContent = () => {
    if (loading) {
      return (
        <>
          <UserTableHeader
            checkboxState={checkboxState as CheckboxState}
            onToggleSelectAll={toggleSelectAll}
          />
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
          <UserTableHeader
            checkboxState={checkboxState as CheckboxState}
            onToggleSelectAll={toggleSelectAll}
          />
          <tbody>
            <tr>
              <td colSpan={6} className="text-center text-danger">
                Error al cargar usuarios
              </td>
            </tr>
          </tbody>
        </>
      );
    }

    return (
      <>
        <UserTableHeader
          checkboxState={checkboxState as CheckboxState}
          onToggleSelectAll={toggleSelectAll}
        />
        <tbody>
          {paginatedUsers.map((user: User) => (
            <UserRow
              key={user.id}
              user={user}
              onShowDetails={handleShowDetails}
              onDelete={handleShowDeleteModal}
              isSelected={isSelected(user.id as number)}
              onToggleSelect={toggleSelection}
            />
          ))}
        </tbody>
      </>
    );
  };

  const showEmptyState = !loading && filteredUsersByRole.length === 0;
  const showNoResults =
    !loading &&
    !error &&
    filteredUsersByRole.length > 0 &&
    filteredUsers.length === 0;
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
        roleFilter={roleFilter}
        dateFilter={dateFilter}
        hasActiveFilters={hasActiveFilters}
        usersCount={filteredUsersByRole.length}
        filteredCount={filteredUsers.length}
        loading={loading}
        setSearchTerm={setSearchTerm}
        setRoleFilter={setRoleFilter}
        setActivityFilter={setActivityFilter}
        setDateFilter={setDateFilter}
        clearFilters={clearFilters}
      />

      <BulkUserActionsToolbar
        selectedCount={selectedCount}
        onClearSelection={deselectAll}
        onDelete={handleBulkDelete}
        onChangeRole={handleRoleChange}
        isProcessing={isProcessing}
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

      {showTable && (
        <>
          <UserTableWrapper>{renderTableContent()}</UserTableWrapper>
          <small
            className="text-muted d-flex align-items-center gap-1 mt-3"
            style={{ lineHeight: 1 }}
          >
            <Info size={15} />
            Los usuarios con rol <strong>{roleName}</strong> no se muestran en
            esta tabla
          </small>
        </>
      )}

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

      <BulkDeleteConfirmationModal
        show={showBulkDeleteModal}
        onHide={() => setShowBulkDeleteModal(false)}
        onConfirm={confirmBulkDelete}
        selectedCount={selectedCount}
        isProcessing={isProcessing}
      />

      <RoleChangeModal
        show={showRoleChangeModal}
        onHide={() => setShowRoleChangeModal(false)}
        onConfirm={confirmRoleChange}
        selectedCount={selectedCount}
        isProcessing={isProcessing}
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
