import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { TrendingUp, Percent } from "lucide-react";
import ActionModal from "./ActionModal";
import { PriceAdjustmentModalProps, AdjustmentType } from "../../types";

function PriceAdjustmentModal({
  show,
  onHide,
  onConfirm,
  selectedCount,
  isProcessing,
}: PriceAdjustmentModalProps) {
  const [type, setType] = useState<AdjustmentType>("increase");
  const [percentage, setPercentage] = useState<number>(0);

  return (
    <ActionModal
      show={show}
      onHide={onHide}
      isProcessing={isProcessing}
      selectedCount={selectedCount}
      title="Ajustar Precios"
      icon={TrendingUp}
      confirmText="Aplicar"
      isValid={percentage > 0}
      onSubmit={() => onConfirm({ type, percentage })}
    >
      <Form.Group className="mb-3">
        <Form.Label htmlFor="type">Tipo de ajuste</Form.Label>
        <Form.Select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as AdjustmentType)}
        >
          <option value="increase">Aumentar</option>
          <option value="decrease">Reducir</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="value">Porcentaje</Form.Label>
        <InputGroup>
          <InputGroup.Text>
            <Percent size={18} />
          </InputGroup.Text>
          <Form.Control
            id="value"
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            placeholder="Ej: 10"
            required
          />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
        <Form.Text className="text-muted">
          {type === "increase"
            ? "Los precios aumentarán en este porcentaje"
            : "Los precios se reducirán en este porcentaje"}
        </Form.Text>
      </Form.Group>
    </ActionModal>
  );
}

export default PriceAdjustmentModal;
