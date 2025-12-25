import { Form, Row, Col, Alert } from "react-bootstrap";
import { ProductFormProps } from "../../types";

function ProductForm({
  register,
  errors,
  watch,
  error,
  errorUpdate,
  setValue,
}: ProductFormProps) {
  const nameLength = watch("name")?.length || 0;
  const descriptionLength = watch("description")?.length || 0;
  const imageUrl = watch("image");

  return (
    <>
      {(error || errorUpdate) && (
        <Alert variant="danger" dismissible>
          {error?.message || errorUpdate?.message || "Error desconocido"}
        </Alert>
      )}

      {imageUrl && (
        <figure className="text-center mb-4">
          <img
            src={imageUrl}
            alt={watch("name") || "Producto"}
            className="img-fluid rounded"
            style={{ maxHeight: "140px", objectFit: "contain" }}
          />
        </figure>
      )}

      <Row className="mb-3">
        <Form.Group as={Col} md={8} controlId="formName">
          <Form.Label className="mb-1">
            Nombre <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            {...register("name")}
            autoComplete="off"
            isInvalid={!!errors.name}
            maxLength={100}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            {nameLength}/100 caracteres
          </Form.Text>
        </Form.Group>

        <Form.Group as={Col} md={4} controlId="formPrice">
          <Form.Label className="mb-1">
            Precio ($) <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="number"
            {...register("price", { valueAsNumber: true })}
            min="0"
            step="0.01"
            isInvalid={!!errors.price}
          />
          <Form.Control.Feedback type="invalid">
            {errors.price?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formDescription">
          <Form.Label className="mb-1">Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            {...register("description")}
            isInvalid={!!errors.description}
            maxLength={300}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description?.message}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            {descriptionLength}/300 caracteres
          </Form.Text>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md={4} controlId="formStock">
          <Form.Label className="mb-1">Stock</Form.Label>
          <Form.Control
            type="number"
            {...register("stock", { valueAsNumber: true })}
            min="0"
            isInvalid={!!errors.stock}
          />
          <Form.Control.Feedback type="invalid">
            {errors.stock?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={4} controlId="formRating">
          <Form.Label className="mb-1">Rating</Form.Label>
          <Form.Control
            type="number"
            {...register("rating", { valueAsNumber: true })}
            min="0"
            max="5"
            step="0.1"
            isInvalid={!!errors.rating}
          />
          <Form.Control.Feedback type="invalid">
            {errors.rating?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={4} controlId="formBrand">
          <Form.Label className="mb-1">Marca</Form.Label>
          <Form.Control
            type="text"
            {...register("brand")}
            isInvalid={!!errors.brand}
            maxLength={50}
          />
          <Form.Control.Feedback type="invalid">
            {errors.brand?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md={8} controlId="formCategory">
          <Form.Label className="mb-1">
            Categoría <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select {...register("category")} isInvalid={!!errors.category}>
            <option value="">Seleccionar categoría</option>
            <option value="hombres">Hombres</option>
            <option value="mujeres">Mujeres</option>
            <option value="tecnologia">Tecnología</option>
            <option value="gaming">Gaming</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.category?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md={4} controlId="formStatus">
          <Form.Label className="mb-1">Estado</Form.Label>
          <Form.Select
            {...register("isActive")}
            value={watch("isActive") ? "true" : "false"}
            onChange={(e) => setValue("isActive", e.target.value === "true")}
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
            {...register("image")}
            placeholder="https://ejemplo.com/imagen.jpg"
            isInvalid={!!errors.image}
          />
          <Form.Control.Feedback type="invalid">
            {errors.image?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
    </>
  );
}

export default ProductForm;
