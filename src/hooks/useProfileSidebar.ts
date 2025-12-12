import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { useUpdateUser } from ".";
import { User } from "../types";

export const useProfileSidebar = () => {
  const { user, logout, updateUserProfile } = useAuthStore();
  const { updateUser, loading } = useUpdateUser();

  const [profileData, setProfileData] = useState({
    id: user?.id || null,
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

      updateUserProfile(updatedUser as User);
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

  const handleMenuClick = (menuId: string) => {
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
