import { Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { Bounce, ToastContainer } from "react-toastify";
import { User, Mail } from "lucide-react";
import { useAuthStore } from "../../stores";
import { useProfileUpdate } from "../../hooks";
import { SectionHeader, PasswordChangeForm, AccountDeletionSection } from "..";
import { User as UserType } from "../../types";

function ProfileMainContent() {
  const {
    user,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    loading,
    showPasswordChange,
    togglePasswordChange,
    handlePasswordChange,
  } = useProfileUpdate();
  const { logout } = useAuthStore();

  return (
    <section>
      <SectionHeader
        title="Mi Perfil"
        subtitle="Toda tu información de cuenta en un solo lugar"
      />
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h5 className="custom__text-secondary mb-3">Datos personales</h5>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="firstName">
                    Nombre <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>
                      <User size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      id="firstName"
                      type="text"
                      placeholder="Ingresa tu nombre"
                      {...register("firstName")}
                      isInvalid={!!errors.firstName}
                      autoComplete="given-name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="lastName">
                    Apellido <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>
                      <User size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      id="lastName"
                      type="text"
                      placeholder="Ingresa tu apellido"
                      {...register("lastName")}
                      isInvalid={!!errors.lastName}
                      autoComplete="family-name"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label htmlFor="email">
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>
                      <Mail size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      {...register("email")}
                      isInvalid={!!errors.email}
                      autoComplete="email"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-3 mt-3">
              <Button
                type="submit"
                variant="primary"
                className="px-4 py-2"
                style={{ fontWeight: "500" }}
                disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? "Guardando..." : "Guardar Cambios"}
              </Button>

              <Button
                variant="outline-primary"
                className="px-4 py-2 custom__text-primary"
                onClick={togglePasswordChange}
              >
                {showPasswordChange ? "Cancelar cambios" : "Cambiar contraseña"}
              </Button>
            </div>
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
          profileData={user as UserType}
          onPasswordChanged={handlePasswordChange}
        />
      )}

      {user?.role !== "super_admin" && (
        <AccountDeletionSection userId={user?.id || 0} onLogout={logout} />
      )}
    </section>
  );
}

export default ProfileMainContent;
