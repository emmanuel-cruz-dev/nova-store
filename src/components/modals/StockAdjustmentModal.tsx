import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Package, Plus, Minus } from "lucide-react";
import ActionModal from "./ActionModal";
import { AdjustmentType, StockAdjustmentModalProps } from "../../types";

function StockAdjustmentModal({
  show,
  onHide,
  onConfirm,
  selectedCount,
  isProcessing,
}: StockAdjustmentModalProps) {
  const [type, setType] = useState<AdjustmentType>("increase");
  const [value, setValue] = useState<number>(0);

  return (
    <ActionModal
      show={show}
      onHide={onHide}
      isProcessing={isProcessing}
      selectedCount={selectedCount}
      title="Ajustar Stock"
      icon={Package}
      confirmText="Aplicar"
      isValid={value >= 0 && (value > 0 || type === "set")}
      onSubmit={() => onConfirm({ type, value })}
    >
      <Form.Group className="mb-3">
        <Form.Label htmlFor="type">Tipo de ajuste</Form.Label>
        <Form.Select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as AdjustmentType)}
        >
          <option value="increase">Incrementar</option>
          <option value="decrease">Decrementar</option>
          <option value="set">Establecer</option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="value">
          {type === "set" ? "Nuevo stock" : "Cantidad"}
        </Form.Label>
        <InputGroup>
          <InputGroup.Text>
            {type === "increase" ? (
              <Plus size={18} />
            ) : type === "decrease" ? (
              <Minus size={18} />
            ) : (
              <Package size={18} />
            )}
          </InputGroup.Text>
          <Form.Control
            id="value"
            type="number"
            min="0"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            placeholder="Ingresa la cantidad"
            required
          />
        </InputGroup>
      </Form.Group>
    </ActionModal>
  );
}

export default StockAdjustmentModal;
