import { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import { AuthContext, useUpdateUser } from "../../../hooks";
import {
  User,
  PasswordChangeFormProps,
  PasswordData,
  PasswordFieldType,
  ShowPasswordState,
  PasswordDataKeys,
} from "../../../types";
import { toast } from "react-toastify";

function PasswordChangeForm({
  profileData,
  onPasswordChanged,
}: PasswordChangeFormProps) {
  const { user, updateUserProfile } = useContext(AuthContext)!;
  const { updateUser } = useUpdateUser();

  const [passwordData, setPasswordData] = useState<PasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState<ShowPasswordState>({
    old: false,
    new: false,
    confirm: false,
  });

  const passwordFields: Array<{
    field: PasswordFieldType;
    label: string;
  }> = [
    { field: "old", label: "Contraseña anterior" },
    { field: "new", label: "Contraseña nueva" },
    { field: "confirm", label: "Confirmar contraseña" },
  ];

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !passwordData.oldPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (passwordData.oldPassword !== user?.password) {
      alert("La contraseña anterior es incorrecta");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("La nueva contraseña y la confirmación no coinciden");
      return;
    }

    if (passwordData.newPassword === passwordData.oldPassword) {
      alert("La nueva contraseña no puede ser la misma que la anterior");
      return;
    }

    try {
      const updatedUser = await updateUser({
        ...profileData,
        password: passwordData.newPassword,
      });

      await updateUserProfile(updatedUser as User);

      onPasswordChanged();
      toast.success("Contraseña actualizada correctamente");
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      toast.error("Error al actualizar la contraseña");
    } finally {
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handlePasswordFieldChange = (
    field: PasswordFieldType,
    value: string
  ) => {
    const fieldKey = `${field}Password` as PasswordDataKeys;
    setPasswordData({
      ...passwordData,
      [fieldKey]: value,
    });
  };

  const togglePasswordVisibility = (field: PasswordFieldType) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body>
        <h4 className="fw-bold mb-1">Cambiar Contraseña</h4>
        <p className="text-muted mb-4">Actualiza tu contraseña</p>

        <Form onSubmit={handlePasswordChange}>
          <Row className="g-3">
            {passwordFields.map(({ field, label }) => (
              <Col md={6} key={field}>
                <Form.Label className="text-muted small" htmlFor={field}>
                  {label}
                </Form.Label>
                <div className="input-group">
                  <Form.Control
                    id={field}
                    type={showPasswords[field] ? "text" : "password"}
                    className="bg-light border-0"
                    placeholder="********"
                    value={passwordData[`${field}Password` as PasswordDataKeys]}
                    onChange={(e) =>
                      handlePasswordFieldChange(field, e.target.value)
                    }
                  />
                  <Button
                    variant="light"
                    className="border-0"
                    onClick={() => togglePasswordVisibility(field)}
                  >
                    {showPasswords[field] ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
          <Button type="submit" variant="primary" className="mt-4">
            Guardar Cambios
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default PasswordChangeForm;
