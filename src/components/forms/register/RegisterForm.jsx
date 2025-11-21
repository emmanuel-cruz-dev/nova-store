import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, User, Mail, Lock, Image } from "lucide-react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useAuth } from "../../../hooks";
import { validateRegisterForm } from "../../../utils/utils";

function RegisterForm() {
  const { register, authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authLoading) return;

    const formErrors = validateRegisterForm(formData);
    if (Object.keys(formErrors).length === 0) {
      const { confirmPassword: _, ...dataToSend } = formData;
      if (!dataToSend.avatar) delete dataToSend.avatar;

      try {
        const newUser = await register(dataToSend);
        console.log("Nuevo usuario:", newUser);
      } catch (error) {
        if (error.message.includes("ya está registrado")) {
          setErrors((prev) => ({
            ...prev,
            email: "Este correo ya está registrado",
          }));
        } else {
          console.error("Error al registrar usuario:", error);
        }
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
                name="firstName"
                placeholder="Juan"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
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
                name="lastName"
                placeholder="Pérez"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
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
            name="email"
            placeholder="nombre@mail.com"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
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
            name="password"
            placeholder="Mínimo 6 caracteres"
            value={formData.password}
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
            name="confirmPassword"
            placeholder="Repite tu contraseña"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={!!errors.confirmPassword}
          />
          <Button
            variant="light"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
          >
            {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
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
            name="avatar"
            placeholder="https://ejemplo.com/mi-foto.jpg"
            value={formData.avatar}
            onChange={handleChange}
            isInvalid={!!errors.avatar}
          />
          <Form.Control.Feedback type="invalid">
            {errors.avatar}
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
