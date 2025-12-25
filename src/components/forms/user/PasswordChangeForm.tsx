import { Eye, EyeOff, Lock } from "lucide-react";
import { Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { usePasswordChange } from "../../../hooks";
import { PasswordChangeFormProps } from "../../../types";
import { passwordFields } from "../../../data/passwordFields";

function PasswordChangeForm({
  profileData,
  onPasswordChanged,
}: PasswordChangeFormProps) {
  const {
    showPasswords,
    togglePasswordVisibility,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
  } = usePasswordChange({ profileData, onPasswordChanged });

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <h4 className="fw-bold mb-1">Cambiar Contraseña</h4>
        <p className="text-muted mb-4">Actualiza tu contraseña</p>

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Row className="g-3">
            {passwordFields.map(({ name, label, field }) => (
              <Col md={6} key={name}>
                <Form.Group>
                  <Form.Label htmlFor={name}>
                    {label} <span className="text-danger">*</span>
                  </Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text>
                      <Lock size={18} />
                    </InputGroup.Text>
                    <Form.Control
                      id={name}
                      type={showPasswords[field] ? "text" : "password"}
                      placeholder="********"
                      {...register(name)}
                      isInvalid={!!errors[name]}
                      autoComplete={
                        name === "oldPassword"
                          ? "current-password"
                          : "new-password"
                      }
                    />
                    <Button
                      variant="light"
                      onClick={() => togglePasswordVisibility(field)}
                      tabIndex={-1}
                    >
                      {showPasswords[field] ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      {errors[name]?.message}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            ))}
          </Row>
          <Button
            type="submit"
            variant="primary"
            className="mt-4 px-5 py-2"
            style={{ fontWeight: "500" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PasswordChangeForm;
