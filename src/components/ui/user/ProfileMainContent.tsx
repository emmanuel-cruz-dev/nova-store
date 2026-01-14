import { Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { Bounce, ToastContainer } from "react-toastify";
import { User, Mail } from "lucide-react";
import { useProfileUpdate } from "../../../hooks";
import { PasswordChangeForm } from "../..";
import { User as UserType } from "../../../types";

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

  return (
    <>
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <header className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="fw-bold mb-1 custom__text-primary">Mi Perfil</h4>
              <p className="custom__text-muted mb-0">
                Toda tu información de cuenta en un solo lugar
              </p>
            </div>
            <Button
              variant="outline-primary custom__text-primary"
              onClick={togglePasswordChange}
            >
              {showPasswordChange
                ? "Ocultar cambiar contraseña"
                : "Cambiar contraseña"}
            </Button>
          </header>

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

            <Button
              type="submit"
              variant="primary"
              className="mt-4 px-5 py-2"
              style={{ fontWeight: "500" }}
              disabled={isSubmitting || loading}
            >
              {isSubmitting || loading ? "Guardando..." : "Guardar Cambios"}
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
          profileData={user as UserType}
          onPasswordChanged={handlePasswordChange}
        />
      )}
    </>
  );
}

export default ProfileMainContent;
