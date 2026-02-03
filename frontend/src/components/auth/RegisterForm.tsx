import { Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Image } from "lucide-react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useRegisterForm } from "../../hooks";

function RegisterForm() {
  const {
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    authLoading,
  } = useRegisterForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="row">
        <div className="col-md-6 mb-3">
          <Form.Group controlId="firstName">
            <Form.Label>
              Nombre <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <User size={18} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Juan"
                {...register("firstName")}
                isInvalid={!!errors.firstName}
                autoComplete="given-name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </div>

        <div className="col-md-6 mb-3">
          <Form.Group controlId="lastName">
            <Form.Label>
              Apellido <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text>
                <User size={18} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Pérez"
                {...register("lastName")}
                isInvalid={!!errors.lastName}
                autoComplete="family-name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName?.message}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </div>
      </div>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>
          Correo electrónico <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text>
            <Mail size={18} />
          </InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="nombre@mail.com"
            {...register("email")}
            isInvalid={!!errors.email}
            autoComplete="email"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>
          Contraseña <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text>
            <Lock size={18} />
          </InputGroup.Text>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Mínimo 6 caracteres"
            {...register("password")}
            isInvalid={!!errors.password}
            autoComplete="new-password"
          />
          <Button
            variant="light"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>
          Confirmar contraseña <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text>
            <Lock size={18} />
          </InputGroup.Text>
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Repite tu contraseña"
            {...register("confirmPassword")}
            isInvalid={!!errors.confirmPassword}
            autoComplete="new-password"
          />
          <Button
            variant="light"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
          >
            {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-4" controlId="avatar">
        <Form.Label>
          Avatar <span className="text-muted">(opcional)</span>
        </Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text>
            <Image size={18} />
          </InputGroup.Text>
          <Form.Control
            type="url"
            placeholder="https://ejemplo.com/mi-foto.jpg"
            {...register("avatar")}
            isInvalid={!!errors.avatar}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {errors.avatar?.message}
          </Form.Control.Feedback>
        </InputGroup>
        <Form.Text className="text-muted">URL de tu imagen de perfil</Form.Text>
      </Form.Group>

      <footer className="d-grid gap-2">
        <Button
          type="submit"
          variant="primary"
          className="py-2 fw-medium rounded-pill"
          disabled={authLoading}
        >
          {authLoading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
        <p className="text-muted text-center mt-3 mb-0">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </footer>
    </Form>
  );
}

export default RegisterForm;
