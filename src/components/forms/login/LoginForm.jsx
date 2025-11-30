import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useLoginForm } from "../../../hooks";

function LoginForm() {
  const {
    showPassword,
    setShowPassword,
    loginData,
    errors,
    authLoading,
    handleChange,
    handleLoginSubmit,
  } = useLoginForm();

  return (
    <Form onSubmit={handleLoginSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>
          Correo electrónico <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text>
            <Mail size={18} />
          </InputGroup.Text>
          <Form.Control
            type="email"
            name="email"
            placeholder="Ej. nombre@mail.com"
            value={loginData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>
          Contraseña <span className="text-danger">*</span>
        </Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text>
            <Lock size={18} />
          </InputGroup.Text>
          <Form.Control
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            value={loginData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Button
            variant="light"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {errors.password}
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
