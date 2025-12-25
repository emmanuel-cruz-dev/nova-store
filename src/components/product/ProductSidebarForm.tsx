import { Offcanvas, Button, Spinner } from "react-bootstrap";
import { useProductForm } from "../../hooks";
import ProductForm from "./ProductForm";
import { ProductSidebarFormProps } from "../../types";

function ProductSidebarForm({
  show,
  onHide,
  productId,
  onUpdate,
  onSuccess,
}: ProductSidebarFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
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
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "500px", maxWidth: "90vw" }}
    >
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="fw-bold">
          {isEditMode ? "Editar Producto" : "Crear Nuevo Producto"}
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column p-0">
        {loadingProduct ? (
          <div className="text-center py-5 flex-grow-1 d-flex align-items-center justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <div className="flex-grow-1 overflow-auto px-4 py-3">
              <form id="product-form" onSubmit={onSubmit}>
                <ProductForm
                  register={register}
                  errors={errors}
                  watch={watch}
                  error={error}
                  errorUpdate={errorUpdate}
                  setValue={setValue}
                />
              </form>
            </div>

            <div className="d-flex gap-2 p-3 border-top bg-light">
              <Button
                variant="secondary"
                onClick={handleCancel}
                disabled={saving}
                className="flex-fill"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={handleSubmit as HTMLFormElement["onSubmit"]}
                disabled={loading || saving}
                className="flex-fill"
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
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ProductSidebarForm;
