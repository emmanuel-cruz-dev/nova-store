import { useState } from "react";
import { Card, Button, Modal, Form, Alert, InputGroup } from "react-bootstrap";
import { Trash2, AlertTriangle, Lock, Eye, EyeOff, Pencil } from "lucide-react";
import { useAccountDeletion } from "../../hooks";

function AccountDeletionSection({
  userId,
  onLogout,
}: {
  userId: number;
  onLogout: () => void;
}) {
  const [showModal, setShowModal] = useState(false);

  const {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isDeleting,
    resetForm,
  } = useAccountDeletion({
    userId,
    onLogout,
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setShowModal(false);
      resetForm();
    }
  };

  return (
    <>
      <Card className="border-danger shadow-sm mb-4">
        <Card.Body>
          <div className="d-flex align-items-start gap-3">
            <div className="text-danger mt-1">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-grow-1">
              <h5 className="text-danger mb-2">Zona de Peligro</h5>
              <p className="custom__text-muted">
                Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor
                asegúrate de estar completamente seguro antes de proceder.
              </p>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  variant="outline-danger"
                  onClick={handleOpenModal}
                  className="d-flex align-items-center gap-2 px-4 py-2"
                >
                  <Trash2 size={18} />
                  Eliminar mi cuenta
                </Button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        backdrop={isDeleting ? "static" : true}
        keyboard={!isDeleting}
      >
        <Modal.Header closeButton={!isDeleting}>
          <Modal.Title className="text-danger d-flex align-items-center gap-2">
            <AlertTriangle size={24} />
            Confirmar eliminación de cuenta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger" className="mb-3">
            <strong>¡Advertencia!</strong> Esta acción es permanente y no se
            puede deshacer. Se eliminarán todos tus datos personales.
          </Alert>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="confirmText">
                Escribe <strong>ELIMINAR</strong> para confirmar
              </Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>
                  <Pencil size={18} />
                </InputGroup.Text>
                <Form.Control
                  id="confirmText"
                  type="text"
                  placeholder="ELIMINAR"
                  {...register("confirmText")}
                  isInvalid={!!errors.confirmText}
                  disabled={isDeleting}
                  autoComplete="off"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmText?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Ingresa tu contraseña</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text>
                  <Lock size={18} />
                </InputGroup.Text>
                <Form.Control
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  {...register("password")}
                  isInvalid={!!errors.password}
                  disabled={isDeleting}
                  autoComplete="current-password"
                />
                <Button
                  variant="light"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  disabled={isDeleting}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Text className="text-muted">
                Por seguridad, necesitamos verificar tu identidad
              </Form.Text>
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleCloseModal}
                disabled={isDeleting}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="danger" disabled={isDeleting}>
                {isDeleting ? "Eliminando..." : "Eliminar permanentemente"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AccountDeletionSection;
