import { useState } from "react";
import { toast } from "react-toastify";
import { useUserByRole } from ".";

export const useUsersTable = (
  role = "customer",
  initialPage = 1,
  pageSize = 10
) => {
  const {
    users,
    loading,
    error,
    deleteUser,
    currentPage,
    totalPages,
    goToPage,
  } = useUserByRole(role, initialPage, pageSize);

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

  return {
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
  };
};
