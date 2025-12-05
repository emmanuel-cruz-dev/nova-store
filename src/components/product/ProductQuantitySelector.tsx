import { Row, Col, Button, InputGroup, Form } from "react-bootstrap";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { ProductQuantitySelectorProps } from "../../types";

const ProductQuantitySelector = ({
  quantity,
  stock,
  isAddingToCart,
  onIncrement,
  onDecrement,
  onQuantityChange,
  onAddToCart,
}: ProductQuantitySelectorProps) => {
  if (stock <= 0) {
    return (
      <Button variant="outline-secondary" className="w-100 py-2" disabled>
        <ShoppingCart size={20} className="me-2" />
        Sin stock
      </Button>
    );
  }

  return (
    <Row className="g-2 mb-3">
      <label className="form-label fw-semibold">Cantidad:</label>
      <Col xs={12} md={5} className="d-flex items-center">
        <InputGroup style={{ maxWidth: "180px" }}>
          <Button
            variant="outline-secondary"
            onClick={onDecrement}
            disabled={quantity <= 1}
          >
            <Minus size={16} />
          </Button>
          <Form.Control
            type="number"
            value={quantity}
            onChange={onQuantityChange}
            className="text-center"
            min="1"
            max={stock}
          />
          <Button
            variant="outline-secondary"
            onClick={onIncrement}
            disabled={quantity >= stock}
          >
            <Plus size={16} />
          </Button>
        </InputGroup>
      </Col>
      <Col xs={12} md={7}>
        <Button
          variant="primary"
          className="w-100 py-2"
          onClick={onAddToCart}
          disabled={isAddingToCart}
        >
          <ShoppingCart size={20} className="me-2" />
          {isAddingToCart ? "Agregando..." : `Agregar al carrito (${quantity})`}
        </Button>
      </Col>
    </Row>
  );
};

export default ProductQuantitySelector;
