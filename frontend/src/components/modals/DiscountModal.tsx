import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Tag, Percent, DollarSign } from "lucide-react";
import ActionModal from "./ActionModal";
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

  return (
    <ActionModal
      show={show}
      onHide={onHide}
      isProcessing={isProcessing}
      selectedCount={selectedCount}
      title="Aplicar Descuento"
      icon={Tag}
      confirmText="Aplicar"
      isValid={value > 0}
      onSubmit={() => onConfirm({ type, value })}
    >
      <Form.Group className="mb-3">
        <Form.Label htmlFor="type">Tipo de descuento</Form.Label>
        <Form.Select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as "percentage" | "fixed")}
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
    </ActionModal>
  );
}

export default DiscountModal;
