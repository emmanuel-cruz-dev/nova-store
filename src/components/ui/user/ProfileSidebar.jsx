import React from "react";
import { Camera } from "lucide-react";
import { Card, Button, ListGroup, Image } from "react-bootstrap";
import { useProfileSidebar } from "../../../hooks";
import { AvatarUpdateModal } from "../../../components";

function ProfileSidebar({ menuItems, activeSection, setActiveSection }) {
  const {
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
  } = useProfileSidebar();

  const onMenuClick = (menuId) => {
    handleMenuClick(menuId);
    if (menuId !== "logout") {
      setActiveSection(menuId);
    }
  };

  return (
    <>
      <Card className="border-0 shadow-sm text-center py-4">
        <Card.Body>
          <div className="position-relative d-inline-block mb-3">
            <Image
              src={profileData.avatar || "https://i.imgur.com/p4HoTq6.jpeg"}
              roundedCircle
              className="border border-3 border-light shadow"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={openAvatarModal}
              alt={`${profileData.firstName} ${profileData.lastName} avatar`}
              loading="lazy"
            />
            <Button
              variant="light"
              className="position-absolute bottom-0 end-0 rounded-circle shadow border border-2 d-flex align-items-center justify-content-center p-1"
              style={{ width: "36px", height: "36px" }}
              onClick={openAvatarModal}
            >
              <Camera size={20} className="text-primary" />
            </Button>
          </div>

          <h5 className="fw-bold mb-1">
            {user?.firstName} {user?.lastName}
          </h5>
          <p className="text-muted small mb-4">{user?.email}</p>

          <ListGroup variant="flush">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <ListGroup.Item
                  key={item.id}
                  action
                  onClick={() => onMenuClick(item.id)}
                  className={`d-flex align-items-center border-0 py-3 ${
                    activeSection === item.id
                      ? "bg-primary bg-opacity-10 border-start border-primary border-4"
                      : ""
                  }`}
                >
                  <Icon size={20} className="me-3" />
                  <span
                    className={activeSection === item.id ? "fw-semibold" : ""}
                  >
                    {item.label}
                  </span>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
      {showAvatarModal && (
        <AvatarUpdateModal
          show={showAvatarModal}
          onClose={closeAvatarModal}
          newAvatarUrl={newAvatarUrl}
          setNewAvatarUrl={setNewAvatarUrl}
          onSave={handleAvatarChange}
          loading={loading}
          currentAvatar={profileData.avatar}
        />
      )}
    </>
  );
}

export default ProfileSidebar;
