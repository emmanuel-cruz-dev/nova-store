import { useState, useContext } from "react";
import { AuthContext, useUpdateUser } from "../hooks";

export const useProfileSidebar = () => {
  const { user, logout, updateUserProfile } = useContext(AuthContext);
  const { updateUser, loading } = useUpdateUser();

  const [profileData, setProfileData] = useState({
    id: user?.id || "",
    email: user?.email || "",
    password: user?.password || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    avatar: user?.avatar || "",
  });

  const [newAvatarUrl, setNewAvatarUrl] = useState(user?.avatar || "");
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const handleAvatarChange = async () => {
    if (!newAvatarUrl) {
      alert("Por favor selecciona una URL de imagen válida");
      return;
    }

    if (newAvatarUrl === profileData.avatar) {
      setShowAvatarModal(false);
      return;
    }

    try {
      setProfileData((prev) => ({ ...prev, avatar: newAvatarUrl }));

      const updatedUser = await updateUser({
        ...profileData,
        avatar: newAvatarUrl,
      });

      updateUserProfile(updatedUser);
      setShowAvatarModal(false);
    } catch (error) {
      console.error("Error al actualizar el avatar:", error);
      alert("Error al actualizar el avatar");
      setNewAvatarUrl(profileData.avatar);
    }
  };

  const openAvatarModal = () => {
    setNewAvatarUrl(profileData.avatar);
    setShowAvatarModal(true);
  };

  const closeAvatarModal = () => {
    setShowAvatarModal(false);
  };

  const handleMenuClick = (menuId) => {
    if (menuId === "logout") {
      logout();
    }
    return menuId;
  };

  return {
    user,
    profileData,
    newAvatarUrl,
    setNewAvatarUrl,
    showAvatarModal,
    loading,
    handleAvatarChange,
    openAvatarModal,
    closeAvatarModal,
    handleMenuClick,
  };
};
