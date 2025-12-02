import { Modal, Button, Spinner } from "react-bootstrap";
import { useProductForm } from "../../hooks";
import ProductForm from "./ProductForm";

function ProductModalForm({ show, onHide, productId, onUpdate, onSuccess }) {
  const {
    formData,
    validationErrors,
    loadingProduct,
    saving,
    loading,
    error,
    errorUpdate,
    isEditMode,
    handleChange,
    handleIsActiveChange,
    handleSubmit,
    resetForm,
  } = useProductForm(productId, onUpdate, onSuccess);

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const handleCancel = () => {
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="md"
      style={{ fontSize: ".8rem" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditMode ? "Editar Producto" : "Crear Nuevo Producto"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loadingProduct ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : (
          <ProductForm
            formData={formData}
            validationErrors={validationErrors}
            error={error}
            errorUpdate={errorUpdate}
            handleChange={handleChange}
            handleIsActiveChange={handleIsActiveChange}
            handleSubmit={handleSubmit}
          />
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel} disabled={saving}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit}
          disabled={loading || saving}
        >
          {saving ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Guardando...
            </>
          ) : isEditMode ? (
            "Guardar Cambios"
          ) : (
            "Crear Producto"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModalForm;
