import { Modal, Form, Alert, InputGroup, Button } from "react-bootstrap";
import { AlertTriangle, Lock, Eye, EyeOff, Pencil } from "lucide-react";
import { AccountDeletionModalProps } from "../../types";

function AccountDeletionModal({
  show,
  onClose,
  showPassword,
  setShowPassword,
  register,
  handleSubmit,
  onSubmit,
  errors,
  isDeleting,
}: AccountDeletionModalProps) {
  return (
    <Modal
      show={show}
      onHide={onClose}
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
          <strong>¡Advertencia!</strong> Esta acción es permanente y no se puede
          deshacer. Se eliminarán todos tus datos personales.
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
            <Button variant="secondary" onClick={onClose} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button type="submit" variant="danger" disabled={isDeleting}>
              {isDeleting ? "Eliminando..." : "Eliminar permanentemente"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AccountDeletionModal;
