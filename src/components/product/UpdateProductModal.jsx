import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useProductById } from "../../hooks";

function UpdateProductModal({ show, onHide, productId, onUpdate }) {
  const { product, loading, error } = useProductById(productId);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    rating: "",
    brand: "",
    category: "",
    isActive: true,
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        rating: product.rating || "",
        brand: product.brand || "",
        category: product.category || "",
        isActive: product.isActive ?? true,
        image: product.image || "",
      });
    }
  }, [product]);

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleClose = () => {
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
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : (
          <>
            {error && (
              <Alert
                variant="danger"
                dismissible
                // onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}

            {formData.image && (
              <figure className="text-center mb-4">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px", objectFit: "contain" }}
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
                  />
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
                  />
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
                  />
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
                  />
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
                  />
                </Form.Group>

                <Form.Group as={Col} md={4} controlId="formBrand">
                  <Form.Label className="mb-1">Marca</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                  />
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
                  >
                    <option value="">Seleccionar categoría</option>
                    <option value="hombres">Hombres</option>
                    <option value="mujeres">Mujeres</option>
                    <option value="tecnologia">Tecnología</option>
                    <option value="gaming">Gaming</option>
                  </Form.Select>
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
                  />
                </Form.Group>
              </Row>
            </Form>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={saving}>
          Cancelar
        </Button>
        <Button
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
          ) : (
            "Guardar Cambios"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateProductModal;
