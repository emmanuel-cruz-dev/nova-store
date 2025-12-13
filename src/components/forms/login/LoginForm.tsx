import { Link } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useLoginForm } from "../../../hooks";

function LoginForm() {
  const {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    onSubmit,
    errors,
    authLoading,
  } = useLoginForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="email">
          Correo electrónico <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text>
            <Mail size={18} />
          </InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Ej. nombre@mail.com"
            {...register("email")}
            isInvalid={!!errors.email}
            autoComplete="email"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">
          Contraseña <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text>
            <Lock size={18} />
          </InputGroup.Text>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="********"
            {...register("password")}
            isInvalid={!!errors.password}
            autoComplete="current-password"
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

      <footer
        className="d-flex flex-column justify-content-end flex-lg-row"
        style={{ marginTop: "2rem" }}
      >
        <Button
          variant="primary"
          type="submit"
          className="px-5 py-2 flex-grow-1 flex-md-grow-0"
          style={{ borderRadius: "25px", fontWeight: "500" }}
          disabled={authLoading}
        >
          {authLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
        <p className="d-lg-none text-muted text-center mt-3 mb-0">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </footer>
    </Form>
  );
}

export default LoginForm;
