import { useState } from "react";
import { Modal, Button, Form, Alert, InputGroup } from "react-bootstrap";
import { Tag, Percent, DollarSign } from "lucide-react";
import { DiscountModalProps, DiscountType } from "../../types";

export function DiscountModal({
  show,
  onHide,
  onConfirm,
  selectedCount,
  isProcessing,
}: DiscountModalProps) {
  const [type, setType] = useState<DiscountType>("percentage");
  const [value, setValue] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value > 0) {
      onConfirm({ type, value });
      setValue(0);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <Tag size={24} />
          Aplicar Descuento
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Alert variant="info" className="mb-3">
            <small>
              Esta acción afectará a <strong>{selectedCount}</strong>{" "}
              {selectedCount === 1 ? "producto" : "productos"}
            </small>
          </Alert>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="type">Tipo de descuento</Form.Label>
            <Form.Select
              id="type"
              value={type}
              onChange={(e) =>
                setType(e.target.value as "percentage" | "fixed")
              }
            >
              <option value="percentage">Porcentaje</option>
              <option value="fixed">Monto fijo</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="value">
              {type === "percentage"
                ? "Porcentaje de descuento"
                : "Monto a descontar"}
            </Form.Label>
            <InputGroup>
              <InputGroup.Text>
                {type === "percentage" ? (
                  <Percent size={18} />
                ) : (
                  <DollarSign size={18} />
                )}
              </InputGroup.Text>
              <Form.Control
                id="value"
                type="number"
                min="0"
                max={type === "percentage" ? "100" : undefined}
                step={type === "percentage" ? "0.1" : "0.01"}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                placeholder={type === "percentage" ? "Ej: 15" : "Ej: 10.00"}
                required
              />
              {type === "percentage" && <InputGroup.Text>%</InputGroup.Text>}
            </InputGroup>
            <Form.Text className="text-muted">
              {type === "percentage"
                ? "El precio se reducirá en este porcentaje"
                : "Este monto se restará del precio actual"}
            </Form.Text>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={isProcessing}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isProcessing || value <= 0}
          >
            {isProcessing ? "Procesando..." : "Aplicar Descuento"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default DiscountModal;
