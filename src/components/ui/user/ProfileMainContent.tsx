import { useState } from "react";
import { Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useAuthStore } from "../../../stores/authStore";
import { useUpdateUser } from "../../../hooks";
import { PasswordChangeForm } from "../..";
import { User, UserData } from "../../../types";

function ProfileMainContent() {
  const { user, updateUserProfile } = useAuthStore();
  const { updateUser, loading } = useUpdateUser();

  const [profileData, setProfileData] = useState<UserData>({
    id: user?.id || null,
    email: user?.email || "",
    password: user?.password || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    avatar: user?.avatar || "",
  });

  const [showPasswordChange, setShowPasswordChange] = useState(false);

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser(profileData as User);
      updateUserProfile(updatedUser as User);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Error al actualizar el perfil");
    }
  };

  const handlePasswordChange = () => {
    setShowPasswordChange(false);
  };

  return (
    <>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <header className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold mb-1">Mi Perfil</h4>
              <p className="text-muted mb-0">
                Toda tu información de cuenta en un solo lugar
              </p>
            </div>
            <Button
              variant="outline-primary"
              onClick={() => setShowPasswordChange(!showPasswordChange)}
            >
              {showPasswordChange
                ? "Ocultar cambiar contraseña"
                : "Cambiar contraseña"}
            </Button>
          </header>

          <Form onSubmit={handleProfileUpdate}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label className="text-muted small" htmlFor="firstName">
                  Nombre
                </Form.Label>
                <Form.Control
                  id="firstName"
                  type="text"
                  className="bg-light border-0"
                  value={profileData.firstName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      firstName: e.target.value,
                    })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label className="text-muted small" htmlFor="lastName">
                  Apellido
                </Form.Label>
                <Form.Control
                  id="lastName"
                  type="text"
                  className="bg-light border-0"
                  value={profileData.lastName}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      lastName: e.target.value,
                    })
                  }
                />
              </Col>
              <Col md={6}>
                <Form.Label className="text-muted small" htmlFor="email">
                  Email
                </Form.Label>
                <Form.Control
                  id="email"
                  type="email"
                  className="bg-light border-0"
                  autoComplete="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      email: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>

            <Button type="submit" variant="primary" className="mt-4">
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer
        position="bottom-left"
        pauseOnHover={true}
        theme="dark"
        transition={Bounce}
      />

      {showPasswordChange && (
        <PasswordChangeForm
          profileData={profileData as User}
          onPasswordChanged={handlePasswordChange}
        />
      )}
    </>
  );
}

export default ProfileMainContent;
