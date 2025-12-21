import { Modal, Button, Spinner } from "react-bootstrap";
import { useProductForm } from "../../hooks";
import ProductForm from "./ProductForm";
import { ProductModalFormProps } from "../../types";

function ProductModalForm({
  show,
  onHide,
  productId,
  onUpdate,
  onSuccess,
}: ProductModalFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    loadingProduct,
    saving,
    loading,
    error,
    errorUpdate,
    isEditMode,
    resetForm,
  } = useProductForm(productId, onUpdate, onSuccess);

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const handleCancel = () => {
    onHide();
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
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
          <form id="product-form" onSubmit={onSubmit}>
            <ProductForm
              register={register}
              errors={errors}
              watch={watch}
              error={error}
              errorUpdate={errorUpdate}
            />
          </form>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel} disabled={saving}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit as HTMLFormElement["onSubmit"]}
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
