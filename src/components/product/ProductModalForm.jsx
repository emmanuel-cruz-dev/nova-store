import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useProductById } from "../../hooks";
import { useCreateProduct, useUpdateProduct } from "../../hooks/useProducts";
import { validateProductForm } from "../../utils/productValidations";

function ProductModalForm({ show, onHide, productId, onUpdate, onSuccess }) {
  const isEditMode = !!productId;
  const {
    product,
    loading: loadingProduct,
    error: errorProduct,
  } = useProductById(productId);
  const {
    updateProduct,
    loading: loadingUpdate,
    error: errorUpdate,
  } = useUpdateProduct();
  const {
    createProduct,
    loading: loadingCreate,
    error: errorCreate,
  } = useCreateProduct();

  const initialFormData = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    rating: 0,
    brand: "",
    category: "",
    isActive: true,
    image: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const saving = loadingUpdate || loadingCreate;
  const loading = loadingUpdate || loadingCreate;
  const error = errorProduct || errorUpdate || errorCreate;

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (product && isEditMode) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        stock: product.stock || 0,
        rating: product.rating || 0,
        brand: product.brand || "",
        category: product.category || "",
        isActive: product.isActive ?? true,
        image: product.image || "",
      });
    } else if (!isEditMode) {
      setFormData(initialFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value) || ""
          : value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseFloat(formData.stock) || 0,
      rating: parseFloat(formData.rating) || 0,
    };

    const errors = validateProductForm(formData);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      if (isEditMode) {
        await updateProduct(productId, dataToSend);
        onUpdate("Producto actualizado exitosamente", "success");
      } else {
        await createProduct(dataToSend);
        onUpdate("Producto creado exitosamente", "success");
      }

      onSuccess();
    } catch (error) {
      if (onUpdate) {
        onUpdate(
          `Error al ${isEditMode ? "actualizar" : "crear"} el producto`,
          "error"
        );
      }
      console.error(
        `Error al ${isEditMode ? "actualizar" : "crear"} el producto:`,
        error
      );
    }
  };

  const handleClose = () => {
    setValidationErrors({});
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
          <>
            {(error || errorUpdate) && (
              <Alert variant="danger" dismissible>
                {error || errorUpdate.message || "Error desconocido"}
              </Alert>
            )}

            {formData.image && (
              <figure className="text-center mb-4">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "140px", objectFit: "contain" }}
                />
              </figure>
            )}

            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md={8} controlId="formName">
                  <Form.Label className="mb-1">Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                    isInvalid={!!validationErrors.name}
                    maxLength={100}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.name}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    {formData.name.length}/100 caracteres
                  </Form.Text>
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="formPrice">
                  <Form.Label className="mb-1">Precio ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    isInvalid={!!validationErrors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.price}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formDescription">
                  <Form.Label className="mb-1">Descripción</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.description}
                    maxLength={300}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.description}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    {formData.description.length}/300 caracteres
                  </Form.Text>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md={4} controlId="formStock">
                  <Form.Label className="mb-1">Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                    isInvalid={!!validationErrors.stock}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.stock}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="formRating">
                  <Form.Label className="mb-1">Rating</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    isInvalid={!!validationErrors.rating}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.rating}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="formBrand">
                  <Form.Label className="mb-1">Marca</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    isInvalid={!!validationErrors.brand}
                    maxLength={50}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.brand}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md={8} controlId="formCategory">
                  <Form.Label className="mb-1">Categoría</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    isInvalid={!!validationErrors.category}
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="hombres">Hombres</option>
                    <option value="mujeres">Mujeres</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="gaming">Gaming</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.category}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="formStatus">
                  <Form.Label className="mb-1">Estado</Form.Label>
                  <Form.Select
                    name="isActive"
                    value={formData.isActive ? "true" : "false"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: e.target.value === "true",
                      }))
                    }
                  >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formImage">
                  <Form.Label className="mb-1">URL de Imagen</Form.Label>
                  <Form.Control
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    isInvalid={!!validationErrors.image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.image}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Form>
          </>
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
