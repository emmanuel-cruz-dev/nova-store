import { Modal, Button, Form, Spinner, Image } from "react-bootstrap";

function AvatarUpdateModal({
  show,
  onClose,
  newAvatarUrl,
  setNewAvatarUrl,
  onSave,
  loading,
  currentAvatar,
}) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Cambiar Imagen de Perfil</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="avatarUrlInput">
            <Form.Label>URL de la Imagen (Avatar)</Form.Label>
            <Form.Control
              type="url"
              placeholder="Pega la URL de tu nueva imagen aquí"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              disabled={loading}
            />
          </Form.Group>

          <div className="text-center mt-4">
            <p className="text-muted small mb-2">Vista Previa:</p>
            <Image
              src={newAvatarUrl || "https://placehold.it/150x150"}
              roundedCircle
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                border: "3px solid #6c757d",
              }}
              alt="Vista previa del avatar"
              onError={(e) => {
                e.target.src = "https://placehold.it/100x100?text=Error";
              }}
            />
          </div>

          {loading && (
            <div className="text-center mt-3">
              <Spinner
                animation="border"
                size="sm"
                role="status"
                className="me-2 text-primary"
              />
              <span className="text-primary small">Actualizando...</span>
            </div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={onSave}
          disabled={loading || !newAvatarUrl || newAvatarUrl === currentAvatar}
        >
          {loading ? "Guardando..." : "Guardar Nuevo Avatar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AvatarUpdateModal;
